"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import trackingService from '@/services/trackingService';
import { debounce } from 'lodash'; // Need to check if lodash exists

interface VideoPlayerProps {
  video: {
    _id: string;
    url: string;
    title: string;
    duration: number;
  };
  initialPosition?: number;
}

export default function VideoPlayer({ video, initialPosition = 0 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const [watchedDuration, setWatchedDuration] = useState(0);
  const [lastPosition, setLastPosition] = useState(initialPosition);
  const [skippedSegments, setSkippedSegments] = useState<{ start: number; end: number }[]>([]);
  const prevTimeRef = useRef(initialPosition);
  const lastUpdateRef = useRef(Date.now());

  // Debounced update to backend
  const updateTracking = useCallback(
    debounce(async (data: any) => {
      try {
        await trackingService.updateTracking(data);
      } catch (error) {
        console.error('Failed to update tracking:', error);
      }
    }, 5000),
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (initialPosition > 0) {
      video.currentTime = initialPosition;
    }

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const now = Date.now();
      const delta = (now - lastUpdateRef.current) / 1000;
      
      // Update watched duration only if video is playing and not seeking
      if (!video.seeking && !video.paused) {
         setWatchedDuration(prev => prev + delta);
      }
      lastUpdateRef.current = now;

      // Detect forward seek (> 5s jump)
      if (currentTime - prevTimeRef.current > 5) {
        setSkippedSegments(prev => [
          ...prev,
          { start: prevTimeRef.current, end: currentTime }
        ]);
      }
      
      prevTimeRef.current = currentTime;
      setLastPosition(currentTime);

      // Periodic update (debounced)
      const watchedPercent = Math.round(((watchedDuration + delta) / video.duration) * 100);
      updateTracking({
        videoId: video._id,
        watchedDuration: watchedDuration + delta,
        lastPosition: currentTime,
        skippedSegments,
        watchedPercent,
        isCompleted: watchedPercent >= 90
      });
    };

    const handleUnload = () => {
      const watchedPercent = Math.round((watchedDuration / video.duration) * 100);
      trackingService.updateTracking({
        videoId: video._id,
        watchedDuration,
        lastPosition: video.currentTime,
        skippedSegments,
        watchedPercent,
        isCompleted: watchedPercent >= 90
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, [video._id, initialPosition, watchedDuration, skippedSegments, updateTracking]);

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        src={video.url}
        controls
        className="w-full h-full"
        onPlay={() => { lastUpdateRef.current = Date.now(); }}
      />
    </div>
  );
}
