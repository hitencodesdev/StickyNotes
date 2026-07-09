"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Download, ExternalLink, FileText, Tag } from "lucide-react";

interface Note {
  id: string;
  subject: string;
  category: string;
  description: string;
  pdfUrl: string;
  externalLink?: string;
  tags: string[];
  createdAt: string;
}

const defaultNotes: Note[] = [
  {
    id: "note-1",
    subject: "Data Structures & Algorithms",
    category: "Computer Science",
    description: "Comprehensive handwritten notes covering Trees, Graphs, Dynamic Programming, and Time Complexities with code implementations.",
    pdfUrl: "#",
    externalLink: "https://github.com",
    tags: ["DSA", "C++", "Interview Prep", "Coding"],
    createdAt: "2026-07-01",
  },
  {
    id: "note-2",
    subject: "Database Management Systems",
    category: "Computer Science",
    description: "Key concepts of normalization (1NF to BCNF), ACID properties, transaction schedules, SQL queries, and indexing methods.",
    pdfUrl: "#",
    externalLink: "https://wikipedia.org",
    tags: ["DBMS", "SQL", "Database", "College Exams"],
    createdAt: "2026-07-03",
  },
  {
    id: "note-3",
    subject: "React 19 & Next.js 16 Cheatsheet",
    category: "Web Dev",
    description: "Detailed sheets explaining React Server Components, Suspense, Server Actions, and optimizations in Next.js App Router.",
    pdfUrl: "#",
    externalLink: "https://nextjs.org",
    tags: ["React", "NextJS", "JavaScript", "Frontend"],
    createdAt: "2026-07-05",
  },
  {
    id: "note-4",
    subject: "System Design Guide",
    category: "Interview Prep",
    description: "Architectural patterns, vertical vs horizontal scaling, load balancers, caching strategies, and CDN networks.",
    pdfUrl: "#",
    externalLink: "https://systemdesign.primer",
    tags: ["System Design", "Scalability", "Architecture"],
    createdAt: "2026-07-07",
  },
  {
    id: "note-5",
    subject: "Computer Networks Fundamentals",
    category: "Computer Science",
    description: "Deep dive into OSI layers, TCP/IP protocols, IP addressing, DNS resolution, and security vulnerabilities.",
    pdfUrl: "#",
    tags: ["Networks", "OSI Model", "TCP", "Security"],
    createdAt: "2026-07-08",
  },
];

const categories = ["All", "Computer Science", "Web Dev", "Interview Prep", "Others"];

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Computer Science");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Load from localStorage or set defaults
  useEffect(() => {
    const savedNotes = localStorage.getItem("exam-notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        setNotes(defaultNotes);
      }
    } else {
      setNotes(defaultNotes);
    }
  }, []);

  // Save to localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("exam-notes", JSON.stringify(updatedNotes));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      subject,
      category,
      description,
      pdfUrl: pdfUrl || "#",
      externalLink: externalLink || undefined,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);

    // Reset Form
    setSubject("");
    setCategory("Computer Science");
    setDescription("");
    setPdfUrl("");
    setExternalLink("");
    setTagsInput("");
    setIsModalOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const updated = notes.filter((note) => note.id !== id);
      saveNotes(updated);
    }
  };

  // Filter & Search Logic
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    const matchesSearch =
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="notes" className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 h-[300px] w-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
              LATEST RESOURCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Quality Study Notes
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Search, filter, download, or access external reference links for various academic and programming topics.
            </p>
          </div>

          {/* Add Note Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Note</span>
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
              placeholder="Search by subject, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Horizontal Category Filters */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  (selectedCategory === cat || (cat === "Others" && selectedCategory === "Others"))
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <FileText className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Notes Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <motion.article
                  layout
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80 shadow-md hover:shadow-xl dark:shadow-slate-950/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <div>
                    {/* Header: Category & Date */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {note.category}
                      </span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 rounded transition-opacity"
                        title="Delete Note"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subject */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {note.subject}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      {note.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                          >
                            <Tag className="h-2.5 w-2.5 text-slate-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {/* Download */}
                      <a
                        href={note.pdfUrl}
                        download
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-xs font-bold transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </a>

                      {/* External Link */}
                      {note.externalLink && (
                        <a
                          href={note.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="Reference Link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Add Note Modal */}
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
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Add New Study Note
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                {/* Subject Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Category & PDF */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Web Dev">Web Dev</option>
                      <option value="Interview Prep">Interview Prep</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      PDF Link
                    </label>
                    <input
                      type="text"
                      value={pdfUrl}
                      onChange={(e) => setPdfUrl(e.target.value)}
                      placeholder="e.g. /files/os-notes.pdf"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* External Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Reference External Link
                  </label>
                  <input
                    type="url"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="e.g. https://geeksforgeeks.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief summary of what the notes cover..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. OS, Semaphores, College"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-55 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Submit / Cancel */}
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
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
                  >
                    Add Note
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
