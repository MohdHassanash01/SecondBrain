import {  FolderSyncIcon, Search, ShareIcon, TagIcon, Twitter, Youtube } from "lucide-react";


import user1 from "/public/images/user1.jpg";
import user2 from "/public/images/user2.jpg";
import user3 from "/public/images/user3.jpg";
import user4 from "/public/images/user4.jpg";
import user5 from "/public/images/user5.jpg";
import user6 from "/public/images/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <Youtube/>, // Replace with your icon component
    text: "Save YouTube Videos",
    description: "Bookmark important videos with notes and timestamps for quick reference."
  },
  {
    icon: <Twitter/>, // Replace with your icon component
    text: "Archive X Threads",
    description: "Capture tweets and entire threads before they disappear from your timeline."
  },
  {
    icon: <TagIcon/>, // Replace with your icon component
    text: "Smart Tagging",
    description: "Automatically categorize content with AI-powered tags for easy retrieval."
  },
  {
    icon: <Search/>, // Replace with your icon component
    text: "Powerful Search",
    description: "Find anything instantly with full-text search across all your saved content."
  },
  {
    icon: <FolderSyncIcon/>, // Replace with your icon component
    text: "Cross-Platform Sync",
    description: "Access your saved content from any device, anytime."
  },
  {
    icon: <ShareIcon/>, // Replace with your icon component
    text: "Share Collections",
    description: "Create and share curated collections with friends or colleagues."
  }
]

export const checklistItems = [
  {
    title: "Save in one click",
    description: "Browser extension lets you save content with a single click"
  },
  {
    title: "Automatic organization",
    description: "Content is automatically categorized based on type and topic"
  },
  {
    title: "Add personal notes",
    description: "Annotate saved items with your own thoughts and insights"
  },
  {
    title: "Instant search",
    description: "Find anything you've saved with powerful search capabilities"
  }
]




export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Save up to 100 items",
      "Basic tagging",
      "Web access only",
      "Community support"
    ]
  },
  {
    title: "Pro",
    price: "$5",
    features: [
      "Unlimited saves",
      "Advanced tagging",
      "Mobile app access",
      "YouTube transcripts",
      "Priority support"
    ]
  },
  {
    title: "Power User",
    price: "$10",
    features: [
      "Everything in Pro",
      "AI-powered organization",
      "Team collections",
      "Full content search",
      "Dedicated account manager"
    ]
  }
]



export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];