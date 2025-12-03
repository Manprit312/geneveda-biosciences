"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Clock,
  BookOpen,
  Dna,
  Microscope,
  Database,
  GraduationCap,
  Globe,
  FlaskConical,
} from "lucide-react";

// Blog post data structure
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  featured?: boolean;
}

// Sample blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introduction to Next-Generation Sequencing (NGS) Technologies",
    excerpt:
      "Explore the revolutionary world of NGS and how it's transforming bioscience research. Learn about different sequencing platforms and their applications.",
    content: "",
    author: "Dr. Priya Sharma",
    date: "2025-01-15",
    category: "NGS",
    tags: ["NGS", "Sequencing", "Genomics", "Technology"],
    image: "/api/placeholder/800/400",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Bioinformatics Tools for Genomic Data Analysis",
    excerpt:
      "A comprehensive guide to essential bioinformatics tools and pipelines for analyzing genomic datasets. From quality control to variant calling.",
    content: "",
    author: "Dr. Rajesh Kumar",
    date: "2025-01-12",
    category: "Bioinformatics",
    tags: ["Bioinformatics", "Genomics", "Data Analysis", "Tools"],
    image: "/api/placeholder/800/400",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "3",
    title: "Understanding Antimicrobial Resistance (AMR) Mechanisms",
    excerpt:
      "Deep dive into the mechanisms of antimicrobial resistance and how researchers are developing strategies to combat this global health threat.",
    content: "",
    author: "Dr. Anjali Patel",
    date: "2025-01-10",
    category: "Research",
    tags: ["AMR", "Microbiology", "Research", "Health"],
    image: "/api/placeholder/800/400",
    readTime: "12 min read",
  },
  {
    id: "4",
    title: "Aptamer Development: From Selection to Application",
    excerpt:
      "Learn about the process of aptamer development, from SELEX methodology to therapeutic and diagnostic applications in modern medicine.",
    content: "",
    author: "Dr. Vikram Singh",
    date: "2025-01-08",
    category: "Research",
    tags: ["Aptamers", "Biotechnology", "Diagnostics", "Therapeutics"],
    image: "/api/placeholder/800/400",
    readTime: "9 min read",
  },
  {
    id: "5",
    title: "Best Universities for Bioscience Studies Abroad",
    excerpt:
      "A curated list of top universities worldwide offering excellent programs in biotechnology, bioinformatics, and biomedical sciences.",
    content: "",
    author: "Study Abroad Team",
    date: "2025-01-05",
    category: "Study Abroad",
    tags: ["Study Abroad", "Universities", "Education", "Career"],
    image: "/api/placeholder/800/400",
    readTime: "15 min read",
  },
  {
    id: "6",
    title: "Molecular Biology Techniques Every Researcher Should Know",
    excerpt:
      "Essential molecular biology techniques including PCR, gel electrophoresis, cloning, and gene expression analysis for modern research.",
    content: "",
    author: "Dr. Meera Nair",
    date: "2025-01-03",
    category: "Training",
    tags: ["Molecular Biology", "Techniques", "Training", "Research"],
    image: "/api/placeholder/800/400",
    readTime: "11 min read",
  },
  {
    id: "7",
    title: "Metagenomics: Exploring Microbial Communities",
    excerpt:
      "Discover how metagenomics is revolutionizing our understanding of microbial communities and their roles in health, environment, and industry.",
    content: "",
    author: "Dr. Arjun Reddy",
    date: "2025-01-01",
    category: "Research",
    tags: ["Metagenomics", "Microbiology", "NGS", "Research"],
    image: "/api/placeholder/800/400",
    readTime: "7 min read",
  },
  {
    id: "8",
    title: "Python for Bioinformatics: Getting Started",
    excerpt:
      "A beginner's guide to using Python for bioinformatics analysis. Learn essential libraries and write your first bioinformatics scripts.",
    content: "",
    author: "Dr. Sneha Desai",
    date: "2024-12-28",
    category: "Training",
    tags: ["Python", "Bioinformatics", "Programming", "Training"],
    image: "/api/placeholder/800/400",
    readTime: "13 min read",
  },
];

const categories = [
  { name: "All", icon: <BookOpen className="w-5 h-5" />, count: blogPosts.length },
  { name: "Research", icon: <FlaskConical className="w-5 h-5" />, count: 4 },
  { name: "NGS", icon: <Dna className="w-5 h-5" />, count: 2 },
  { name: "Bioinformatics", icon: <Database className="w-5 h-5" />, count: 2 },
  { name: "Training", icon: <GraduationCap className="w-5 h-5" />, count: 2 },
  { name: "Study Abroad", icon: <Globe className="w-5 h-5" />, count: 1 },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Research":
      return <FlaskConical className="w-5 h-5" />;
    case "NGS":
      return <Dna className="w-5 h-5" />;
    case "Bioinformatics":
      return <Database className="w-5 h-5" />;
    case "Training":
      return <GraduationCap className="w-5 h-5" />;
    case "Study Abroad":
      return <Globe className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Dna className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">GeneVeda Biosciences</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">
                Home
              </Link>
              <Link href="/blog" className="text-emerald-600 font-semibold">
                Blog
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-emerald-600 transition">
                Services
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-emerald-600 transition">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bioscience Research Blog</h1>
            <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
              Stay updated with the latest research, technologies, and insights in biosciences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    selectedCategory === category.name
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getCategoryIcon(post.category)}
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </h2>
            <span className="text-gray-600">{filteredPosts.length} articles</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-teal-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getCategoryIcon(post.category)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="w-8 h-8 text-emerald-400" />
                <span className="text-xl font-bold">GeneVeda Biosciences</span>
              </div>
              <p className="text-gray-400">Advancing bioscience research, innovation & global careers</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Blog Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Research</li>
                <li>NGS</li>
                <li>Bioinformatics</li>
                <li>Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Study Abroad</li>
                <li>Training Courses</li>
                <li>Research Support</li>
                <li>Career Guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@geneveda.com</li>
                <li>+91 XXX XXX XXXX</li>
                <li>Chennai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 GeneVeda Biosciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

