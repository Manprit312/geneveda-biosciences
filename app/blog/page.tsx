"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  Menu,
  X,
} from "lucide-react";

// Blog post data structure
interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: string;
  featured?: boolean;
}

const categories = [
  { name: "All", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Research", icon: <FlaskConical className="w-5 h-5" /> },
  { name: "NGS", icon: <Dna className="w-5 h-5" /> },
  { name: "Bioinformatics", icon: <Database className="w-5 h-5" /> },
  { name: "Training", icon: <GraduationCap className="w-5 h-5" /> },
  { name: "Study Abroad", icon: <Globe className="w-5 h-5" /> },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/blogs?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBlogPosts(data.blogs || []);
      } else {
        setError(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBlogs();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory !== "All" && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/50 border-b border-emerald-100/50 dark:border-emerald-900/50 sticky top-0 z-50 backdrop-blur-md transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Dna className="w-8 h-8 text-emerald-600 dark:text-emerald-400 transition-colors duration-300" />
              <span className="text-xl font-bold gradient-text transition-all duration-300">GeneVeda Biosciences</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/blog" className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Blog
              </Link>
              <Link href="/#services" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Services
              </Link>
              <Link href="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Contact
              </Link>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 relative z-[100]"
                aria-label="Toggle menu"
                type="button"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[70] overflow-y-auto"
              style={{ paddingTop: '4rem' }}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-emerald-600 dark:text-emerald-400 font-semibold py-2"
                >
                  Blog
                </Link>
                <Link
                  href="/#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Services
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-blue-600 dark:from-emerald-700 dark:via-emerald-600 dark:to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Bioscience Research Blog</h1>
            <p className="text-xl text-emerald-50 dark:text-emerald-100 max-w-2xl mx-auto">
              Stay updated with the latest research, technologies, and insights in biosciences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm py-6 transition-colors">
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
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
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
                      ? "btn-premium text-white shadow-lg"
                      : "bg-emerald-50 dark:bg-emerald-900/20 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">
                    ({blogPosts.filter(p => category.name === "All" || p.category === category.name).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium rounded-xl overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-900/20 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized={!post.image.includes('cloudinary.com')}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {getCategoryIcon(post.category)}
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm gradient-text font-semibold mb-2">
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
      <section className="py-12 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </h2>
            <span className="text-gray-600 dark:text-gray-400">{filteredPosts.length} articles</span>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error loading articles</h3>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-premium rounded-xl overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-40 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-900/20 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized={!post.image.includes('cloudinary.com')}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {getCategoryIcon(post.category)}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm gradient-text font-semibold mb-2">
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-16 border-t border-gray-800 dark:border-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="w-8 h-8 text-emerald-400 dark:text-emerald-400 transition-colors duration-300" />
                <span className="text-xl font-bold gradient-text transition-all duration-300">GeneVeda Biosciences</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500">Advancing bioscience research, innovation & global careers</p>
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


