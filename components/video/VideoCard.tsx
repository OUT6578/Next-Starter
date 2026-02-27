"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VideoCardProps {
  video: {
    _id: string;
    title: string;
    thumbnail: string;
    duration: number;
    category?: { name: string };
    watchedPercent?: number;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Link href={`/videos/${video._id}`}>
      <Card className="group overflow-hidden border-0 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1074"}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(video.duration)}
          </div>
          
          {/* Progress bar at bottom of thumbnail */}
          {video.watchedPercent !== undefined && video.watchedPercent > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${video.watchedPercent}%` }}
              />
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-blue-50 text-blue-600 hover:bg-blue-100">
              {video.category?.name || "General"}
            </Badge>
            {video.watchedPercent !== undefined && video.watchedPercent >= 90 && (
              <Badge className="bg-green-100 text-green-700 text-[10px]">Completed</Badge>
            )}
          </div>
          <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 text-[11px] text-gray-500 flex justify-between items-center">
           {video.watchedPercent !== undefined && video.watchedPercent > 0 ? (
             <div className="w-full space-y-1">
               <div className="flex justify-between">
                 <span>{video.watchedPercent}% watched</span>
               </div>
               <Progress value={video.watchedPercent} className="h-1" />
             </div>
           ) : (
             <span>Not started</span>
           )}
        </CardFooter>
      </Card>
    </Link>
  );
}
