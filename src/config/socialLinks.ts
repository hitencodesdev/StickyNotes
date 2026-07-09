export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Lucide icon name to be resolved dynamically
  color: string; // CSS color classes for hover states
}

export const socialLinks: Record<string, SocialLink> = {
  youtube: {
    name: "YouTube",
    url: "https://youtube.com",
    icon: "Youtube",
    color: "hover:text-red-500 hover:bg-red-50/10",
  },
  pinterest: {
    name: "Pinterest",
    url: "https://pinterest.com",
    icon: "Pin",
    color: "hover:text-red-600 hover:bg-red-50/10",
  },
  instagram: {
    name: "Instagram",
    url: "https://instagram.com",
    icon: "Instagram",
    color: "hover:text-pink-500 hover:bg-pink-50/10",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "Linkedin",
    color: "hover:text-blue-500 hover:bg-blue-50/10",
  },
  github: {
    name: "GitHub",
    url: "https://github.com",
    icon: "Github",
    color: "hover:text-gray-400 hover:bg-gray-50/10",
  },
};
