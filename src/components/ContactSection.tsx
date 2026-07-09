"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { GithubIcon, YoutubeIcon, LinkedinIcon, InstagramIcon, PinterestIcon } from "@/components/BrandIcons";
import { socialLinks } from "@/config/socialLinks";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Hide success notification after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const getSocialIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-5 w-5" />;
      case "youtube":
        return <YoutubeIcon className="h-5 w-5" />;
      case "linkedin":
        return <LinkedinIcon className="h-5 w-5" />;
      case "instagram":
        return <InstagramIcon className="h-5 w-5" />;
      case "pin":
        return <PinterestIcon className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-white dark:bg-slate-900">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-10 h-[300px] w-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contact Support
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg">
            Have any questions or suggestions for notes? Feel free to reach out to us!
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 shadow-md">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-6 shadow">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Message Sent!
                    </h3>
                    <p className="text-slate-550 dark:text-slate-400 mt-2 max-w-sm">
                      Thank you for contacting us. We will review your submission and get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="johndoe@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Feedback / Inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your suggestions or details of notes you want to see added..."
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-75 text-white font-bold shadow-md shadow-purple-500/10 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4.5 w-4.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Info & Google Maps Mockup */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {/* Info Cards */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/45 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Address</h4>
                  <a
                    href="mailto:contact@examreadynotes.com"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    contact@examreadynotes.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/45 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Our Location</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Silicon Valley, California, United States
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/45 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Support Hours</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Monday – Friday: 9:00 AM – 6:00 PM EST
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-205 text-sm uppercase tracking-wider mb-3">
                  Follow Us Online
                </h4>
                <div className="flex gap-2">
                  {Object.entries(socialLinks).map(([key, link]) => (
                    <a
                      key={key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors ${link.color}`}
                      title={link.name}
                    >
                      {getSocialIconComponent(link.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Vector Google Maps Placeholder */}
            <div className="relative h-44 rounded-3xl overflow-hidden bg-slate-950/5 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center p-6 text-center">
              {/* Background abstract layout mimicking map roads */}
              <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeWidth="4" />
                  <line x1="120" y1="0" x2="120" y2="200" stroke="currentColor" strokeWidth="3" />
                  <line x1="280" y1="0" x2="280" y2="200" stroke="currentColor" strokeWidth="2" />
                  <circle cx="280" cy="120" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Glowing Location Pin */}
              <div className="relative mb-3 flex items-center justify-center">
                <div className="absolute h-8 w-8 rounded-full bg-purple-500/35 animate-ping" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow shadow-purple-500/20">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
              <h5 className="font-bold text-slate-800 dark:text-white text-xs">Silicon Valley Campus</h5>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                California, USA • Google Maps Location ID: ER-90210
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
