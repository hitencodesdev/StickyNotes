"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Link2, Globe, Terminal, FileText, Compass, ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  category: "Coding" | "Interview" | "PDF" | "Practice" | "Website";
  url: string;
  description: string;
  createdAt: string;
}

const defaultResources: Resource[] = [
  {
    id: "res-1",
    title: "LeetCode 75 Study Plan",
    category: "Practice",
    url: "https://leetcode.com/studyplan/leetcode-75/",
    description: "The essential 75 coding questions to learn the core patterns of algorithms and data structures.",
    createdAt: "2026-07-02",
  },
  {
    id: "res-2",
    title: "System Design Primer Guide",
    category: "Coding",
    url: "https://github.com/donnemartin/system-design-primer",
    description: "An open-source repository containing diagrams and deep-dives for learning how to design large-scale systems.",
    createdAt: "2026-07-03",
  },
  {
    id: "res-3",
    title: "Front-End Developer Interview Handbook",
    category: "Interview",
    url: "https://www.frontendinterviewhandbook.com/",
    description: "A complete manual answering typical CSS, JS, HTML, React, and system design interview questions.",
    createdAt: "2026-07-05",
  },
  {
    id: "res-4",
    title: "SQL Query Optimization Cheat Sheet",
    category: "PDF",
    url: "https://learn.microsoft.com/",
    description: "Printable PDF covering execution plans, indexing strategies, join orderings, and aggregate functions.",
    createdAt: "2026-07-06",
  },
  {
    id: "res-5",
    title: "MDN Web Docs Reference Guide",
    category: "Website",
    url: "https://developer.mozilla.org",
    description: "The authority website for web standards, JavaScript APIs, CSS properties, and HTML tag definitions.",
    createdAt: "2026-07-07",
  },
];

const categoryColors: Record<Resource["category"], { bg: string; text: string; iconBg: string }> = {
  Coding: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-500" },
  Interview: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-500" },
  PDF: { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-600 dark:text-rose-400", iconBg: "bg-rose-500" },
  Practice: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-600 dark:text-cyan-400", iconBg: "bg-cyan-500" },
  Website: { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-600 dark:text-indigo-400", iconBg: "bg-indigo-500" },
};

export default function ResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | Resource["category"]>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Resource["category"]>("Coding");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("exam-resources");
    if (saved) {
      try {
        setResources(JSON.parse(saved));
      } catch (e) {
        setResources(defaultResources);
      }
    } else {
      setResources(defaultResources);
    }
  }, []);

  const saveResources = (newResources: Resource[]) => {
    setResources(newResources);
    localStorage.setItem("exam-resources", JSON.stringify(newResources));
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title,
      category,
      url,
      description,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newRes, ...resources];
    saveResources(updated);

    // Reset Form
    setTitle("");
    setCategory("Coding");
    setUrl("");
    setDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteResource = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this resource?");
    if (confirmed) {
      const updated = resources.filter((res) => res.id !== id);
      saveResources(updated);
    }
  };

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: Resource["category"]) => {
    switch (cat) {
      case "Coding":
        return <Terminal className="h-5 w-5 text-white" />;
      case "Interview":
        return <FileText className="h-5 w-5 text-white" />;
      case "PDF":
        return <FileText className="h-5 w-5 text-white" />;
      case "Practice":
        return <Compass className="h-5 w-5 text-white" />;
      case "Website":
        return <Globe className="h-5 w-5 text-white" />;
    }
  };

  return (
    <section id="resources" className="relative py-24 bg-white dark:bg-slate-900">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-10 right-10 h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
        <div className="absolute top-10 left-10 h-[300px] w-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
              USEFUL HYPERLINKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Curated Resources
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Quickly bookmark and view programming, interview, and practicing reference links from one location.
            </p>
          </div>

          {/* Add Resource Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span>Add Resource</span>
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search resource title or info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-805 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {["All", "Coding", "Interview", "PDF", "Practice", "Website"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-805 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources list cards */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-850 rounded-3xl border border-slate-150/50 dark:border-slate-800">
            <Link2 className="h-16 w-16 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Resources Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Add custom external links, practices, or PDFs to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((res) => {
                const color = categoryColors[res.category];
                return (
                  <motion.div
                    layout
                    key={res.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      {/* Top bar with Icon & category */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color.iconBg} shadow`}>
                          {getCategoryIcon(res.category)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg ${color.bg} ${color.text} text-[10px] font-bold uppercase tracking-wider`}>
                            {res.category}
                          </span>
                          <button
                            onClick={(e) => handleDeleteResource(e, res.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete Resource"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-bold text-slate-905 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Visit Link</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Resource Modal */}
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
                  Add New Resource Link
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddResource} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Resource Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. GeeksforGeeks DP Roadmap"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Resource Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-855 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="Coding">Coding Resource</option>
                    <option value="Interview">Interview Notes</option>
                    <option value="PDF">PDF Reference</option>
                    <option value="Practice">Practice Link</option>
                    <option value="Website">External Website</option>
                  </select>
                </div>

                {/* URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    URL Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
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
                    placeholder="Provide a quick tagline summarizing what this reference covers..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-md shadow-emerald-500/10 transition-colors cursor-pointer"
                  >
                    Add Resource
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
