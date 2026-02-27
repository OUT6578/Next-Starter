"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import videoService from "@/services/videoService";
import trackingService from "@/services/trackingService";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Tag, User } from "lucide-react";

export default function VideoDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [video, setVideo] = useState<any>(null);
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !user) return;
      try {
        setLoading(true);
        const [videoRes, trackingRes] = await Promise.all([
          videoService.getVideoById(id as string),
          trackingService.getUserVideoTracking(user._id, id as string)
        ]);
        setVideo(videoRes.data);
        setTracking(trackingRes.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [id, user, isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-600">{error || "Video not found"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <VideoPlayer 
          video={video} 
          initialPosition={tracking?.lastPosition || 0} 
        />
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {video.category?.name || "General"}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(video.duration / 60)} min</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Uploaded by {video.uploadedBy?.name || "Admin"}</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">{video.description}</p>
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {video.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Watched</span>
              <span className="font-semibold">{tracking?.watchedPercent || 0}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${tracking?.watchedPercent || 0}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 italic">
              {tracking?.isCompleted ? "Completed!" : "Keep watching to complete"}
            </p>
          </CardContent>
        </Card>

        {/* Related videos could go here */}
      </div>
    </div>
  );
}
