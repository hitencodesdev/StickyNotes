"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, X, Video, Film, Eye } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  description: string;
  createdAt: string;
}

const defaultVideos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Next.js App Router & Server Actions Masterclass",
    url: "https://www.youtube.com/watch?v=Rgw0dF6b-t4", // Example Next.js video
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80",
    duration: "42:15",
    description: "Learn client components, server actions, page optimization, caching strategies, and layout patterns in Next.js.",
    createdAt: "2026-07-02",
  },
  {
    id: "vid-2",
    title: "Deep Dive into Big-O Notation & Complexity",
    url: "https://www.youtube.com/watch?v=V6mKRYt4A90", // Example Big O
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    duration: "18:40",
    description: "Understand time and space complexity with bubble sort, merge sort, binary search, and recursive function examples.",
    createdAt: "2026-07-04",
  },
  {
    id: "vid-3",
    title: "Modern CSS Grid & Flexbox layouts",
    url: "https://www.youtube.com/watch?v=jV8B24rSN5o", // CSS Grid
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    duration: "24:55",
    description: "A complete guide to constructing responsive web interfaces without any frameworks using grid rows, areas, and auto-fit columns.",
    createdAt: "2026-07-06",
  },
];

// Helper to extract YouTube ID
function getYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  // Load from local storage
  useEffect(() => {
    const savedVideos = localStorage.getItem("exam-videos");
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (e) {
        setVideos(defaultVideos);
      }
    } else {
      setVideos(defaultVideos);
    }
  }, []);

  const saveVideos = (newVideos: VideoItem[]) => {
    setVideos(newVideos);
    localStorage.setItem("exam-videos", JSON.stringify(newVideos));
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    let finalThumbnail = thumbnail;
    const ytid = getYoutubeId(url);

    // If it's a YouTube link, automatically set thumbnail if not provided
    if (ytid && !finalThumbnail) {
      finalThumbnail = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
    } else if (!finalThumbnail) {
      // Fallback
      finalThumbnail = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80";
    }

    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title,
      url,
      thumbnail: finalThumbnail,
      duration: duration || "N/A",
      description,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newVideo, ...videos];
    saveVideos(updated);

    // Reset Form
    setTitle("");
    setUrl("");
    setThumbnail("");
    setDuration("");
    setDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteVideo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent playing
    const confirmed = window.confirm("Are you sure you want to delete this video?");
    if (confirmed) {
      const updated = videos.filter((v) => v.id !== id);
      saveVideos(updated);
    }
  };

  return (
    <section id="videos" className="relative py-24 bg-slate-55 dark:bg-slate-900/50">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 h-[350px] w-[350px] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 h-[350px] w-[350px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
              VIDEO TUTORIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Watch & Learn
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Gain visual and audio-based clarity on engineering design concepts and programming languages.
            </p>
          </div>

          {/* Add Video Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span>Add Video Link</span>
          </motion.button>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Film className="h-16 w-16 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Videos Uploaded</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Click &quot;Add Video Link&quot; to upload your first tutorial reference.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const ytid = getYoutubeId(vid.url);
              // Use higher res YouTube thumb if possible
              const displayThumb = ytid && vid.thumbnail.includes("unsplash.com") 
                ? `https://img.youtube.com/vi/${ytid}/maxresdefault.jpg` 
                : vid.thumbnail;

              return (
                <motion.div
                  key={vid.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setActiveVideoUrl(vid.url)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white dark:bg-slate-850 border border-slate-150/50 dark:border-slate-800/80 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayThumb}
                        alt={vid.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center transition-colors group-hover:bg-slate-950/40">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 shadow-lg backdrop-blur-sm"
                        >
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </motion.div>
                      </div>

                      {/* Video duration badge */}
                      <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/75 text-[10px] font-bold text-white font-mono">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {vid.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-5 pb-5 pt-3 flex justify-between items-center border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>Added {vid.createdAt}</span>
                    <button
                      onClick={(e) => handleDeleteVideo(e, vid.id)}
                      className="text-red-500 hover:text-red-700 font-bold uppercase transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Playback Lightbox */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8">
            {/* Click away overlay */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveVideoUrl(null)}
            />

            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 z-10"
            >
              {(() => {
                const ytid = getYoutubeId(activeVideoUrl);
                if (ytid) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytid}?autoplay=1&rel=0`}
                      title="Video Player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  );
                } else {
                  return (
                    <video
                      src={activeVideoUrl}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  );
                }
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Video Link Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Add Video Resource
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dynamic Programming Introduction"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Video URL (YouTube or MP4) *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                {/* Duration & Thumbnail */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 15:30"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Custom Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      placeholder="Optional image url"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short summary of what is taught in this video..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md shadow-indigo-500/10 transition-colors cursor-pointer"
                  >
                    Add Video
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
