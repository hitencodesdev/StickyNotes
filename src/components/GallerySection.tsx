"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Eye, ChevronLeft, ChevronRight, Image as ImageIcon, Plus } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Photo" | "Infographic" | "Screenshot";
  src: string;
  description: string;
  createdAt: string;
}

const defaultItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Data Structures Flowchart",
    category: "Infographic",
    src: "/gallery/dsa_infographic.png",
    description: "Visual taxonomy map showing relationship between linear and non-linear data structures, trees, graphs, and heap layouts.",
    createdAt: "2026-07-01",
  },
  {
    id: "gal-2",
    title: "SQL Relational Schema",
    category: "Screenshot",
    src: "/gallery/db_screenshot.png",
    description: "Database table relationships diagram modeling users, payments, orders, and products for a retail application.",
    createdAt: "2026-07-03",
  },
  {
    id: "gal-3",
    title: "Microservices Architecture",
    category: "Infographic",
    src: "/gallery/system_architecture.png",
    description: "High-level diagram illustrating API Gateway, Auth Microservice, Notification queues, and database replicas.",
    createdAt: "2026-07-05",
  },
];

const categories = ["All", "Photo", "Infographic", "Screenshot"];

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Photo" | "Infographic" | "Screenshot">("Photo");
  const [description, setDescription] = useState("");
  const [srcUrl, setSrcUrl] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  // Load from local storage
  useEffect(() => {
    const savedItems = localStorage.getItem("exam-gallery");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        setItems(defaultItems);
      }
    } else {
      setItems(defaultItems);
    }
  }, []);

  const saveItems = (newItems: GalleryItem[]) => {
    setItems(newItems);
    localStorage.setItem("exam-gallery", JSON.stringify(newItems));
  };

  // Handle local image upload as base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
        setSrcUrl(""); // Clear URL input if file is chosen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSrc = srcUrl || fileBase64;
    if (!title || !finalSrc) {
      alert("Please provide an image file or enter a valid URL.");
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title,
      category,
      src: finalSrc,
      description: description || `Study resource covering ${title}.`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset Form
    setTitle("");
    setCategory("Photo");
    setDescription("");
    setSrcUrl("");
    setFileBase64("");
    setIsUploadOpen(false);
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid triggering lightbox
    const confirmed = window.confirm("Are you sure you want to delete this gallery item?");
    if (confirmed) {
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    }
  };

  // Filter Logic
  const filteredItems = items.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  const openLightbox = (id: string) => {
    // Find index of item in the current filtered list to allow navigation
    const idx = filteredItems.findIndex((item) => item.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section id="gallery" className="relative py-24 bg-white dark:bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 h-[400px] w-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 h-[400px] w-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest">
              VISUAL AIDS & CHARTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Resource Gallery
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Browse visual maps, key screenshots, and detailed infographics that simplify complicated topics.
            </p>
          </div>

          {/* Add Image Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-purple-500/10 cursor-pointer"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Resource</span>
          </motion.button>
        </div>

        {/* Categories filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-100 dark:border-slate-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800/80">
            <ImageIcon className="h-16 w-16 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Visual Resources</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Be the first to upload an infographic, photo, or screenshot!
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(item.id)}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-850 shadow-md"
                >
                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                  {/* Details Overlay (visible on hover) */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => handleDeleteItem(e, item.id)}
                        className="p-1 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow"
                        title="Delete Item"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-white">
                      <h3 className="text-lg font-bold line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-slate-200 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-blue-400 font-bold text-xs">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Click to expand</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8">
            {/* Close trigger overlay */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox content card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col md:flex-row bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center bg-black/50 p-2 h-[40vh] md:h-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[40vh] md:max-h-[70vh] object-contain"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-slate-900 text-white border-t md:border-t-0 md:border-l border-slate-800">
                <div>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-xl font-bold mt-4">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-850 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>Uploaded</span>
                  <span>{filteredItems[lightboxIndex].createdAt}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
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
                  Upload Visual Aid
                </h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. OSI Model Diagram"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                {/* Category selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Category Type
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <option value="Photo">Photo</option>
                    <option value="Infographic">Infographic</option>
                    <option value="Screenshot">Screenshot</option>
                  </select>
                </div>

                {/* Choose Source: Local File or URL */}
                <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3 bg-slate-50 dark:bg-slate-850">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Option A: Upload File (Image)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-950/40 dark:file:text-purple-400"
                    />
                  </div>

                  <div className="text-center text-xs font-bold text-slate-400">
                    — OR —
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Option B: Image URL
                    </label>
                    <input
                      type="url"
                      value={srcUrl}
                      onChange={(e) => {
                        setSrcUrl(e.target.value);
                        setFileBase64(""); // Clear local file if URL is written
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2"
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
                    placeholder="Describe what key concepts this diagram or image illustrates..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-purple-500/10 transition-colors cursor-pointer"
                  >
                    Add to Gallery
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
