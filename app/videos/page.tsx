"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import videoService from "@/services/videoService";
import trackingService from "@/services/trackingService";
import categoryService from "@/services/categoryService";
import VideoCard from "@/components/video/VideoCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, LayoutGrid, List } from "lucide-react";

export default function VideoListPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [videosRes, categoriesRes, trackingRes] = await Promise.all([
          videoService.getVideos(),
          categoryService.getCategories(),
          user ? trackingService.getUserTracking(user._id) : Promise.resolve({ data: [] })
        ]);

        // Merge tracking info with videos
        const trackingMap = new Map();
        trackingRes.data.forEach((t: any) => trackingMap.set(t.videoId.toString(), t));

        const mergedVideos = videosRes.data.map((v: any) => ({
          ...v,
          watchedPercent: trackingMap.get(v._id.toString())?.watchedPercent || 0,
          isCompleted: trackingMap.get(v._id.toString())?.isCompleted || false,
        }));

        setVideos(mergedVideos);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (authLoading && loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Skeleton key={i} className="aspect-video w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Video Library</h1>
          <p className="text-gray-500">Discover and track your progress through our collection</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 border-gray-200 focus:ring-blue-500 transition-all rounded-xl shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b pb-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="bg-gray-100 p-1 rounded-xl flex-wrap justify-start h-auto">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All Videos
            </TabsTrigger>
            {categories.map(cat => (
              <TabsTrigger key={cat._id} value={cat._id} className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2 text-gray-400">
           <LayoutGrid className="w-5 h-5 text-blue-600" />
           <List className="w-5 h-5" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Skeleton key={i} className="aspect-video w-full rounded-xl" />
          ))}
        </div>
      ) : filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <Filter className="mx-auto w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No videos found</h3>
          <p className="text-gray-400">Try adjusting your filters or search keywords</p>
        </div>
      )}
    </div>
  );
}
