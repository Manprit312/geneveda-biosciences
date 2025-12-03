"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  BookOpen,
  Dna,
  Microscope,
  Database,
  GraduationCap,
  Globe,
  FlaskConical,
} from "lucide-react";

// Blog post data (in real app, this would come from a database or CMS)
const blogPosts: Record<
  string,
  {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    date: string;
    category: string;
    tags: string[];
    readTime: string;
    featured?: boolean;
  }
> = {
  "1": {
    id: "1",
    title: "Introduction to Next-Generation Sequencing (NGS) Technologies",
    excerpt:
      "Explore the revolutionary world of NGS and how it's transforming bioscience research.",
    content: `
      <h2>What is Next-Generation Sequencing?</h2>
      <p>Next-Generation Sequencing (NGS) has revolutionized the field of genomics and bioscience research. Unlike traditional Sanger sequencing, NGS allows researchers to sequence millions of DNA fragments simultaneously, dramatically reducing the time and cost of genomic analysis.</p>
      
      <h2>Key NGS Platforms</h2>
      <p>Several major platforms dominate the NGS market:</p>
      <ul>
        <li><strong>Illumina</strong>: The most widely used platform, known for high accuracy and throughput</li>
        <li><strong>Oxford Nanopore</strong>: Offers long-read sequencing capabilities</li>
        <li><strong>PacBio</strong>: Specializes in long-read sequencing for complex genomes</li>
        <li><strong>Ion Torrent</strong>: Provides fast sequencing for targeted applications</li>
      </ul>
      
      <h2>Applications in Bioscience Research</h2>
      <p>NGS has found applications across various domains:</p>
      <ul>
        <li><strong>Whole Genome Sequencing</strong>: Complete genomic analysis of organisms</li>
        <li><strong>RNA-Seq</strong>: Transcriptome analysis and gene expression studies</li>
        <li><strong>Metagenomics</strong>: Studying microbial communities</li>
        <li><strong>Variant Analysis</strong>: Identifying genetic variations and mutations</li>
        <li><strong>Epigenomics</strong>: Analyzing DNA methylation and histone modifications</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>As NGS technology continues to evolve, we're seeing improvements in:</p>
      <ul>
        <li>Longer read lengths</li>
        <li>Reduced sequencing costs</li>
        <li>Faster turnaround times</li>
        <li>Enhanced accuracy</li>
        <li>Portable sequencing devices</li>
      </ul>
      
      <p>These advancements are making NGS more accessible and opening new possibilities for personalized medicine, agricultural biotechnology, and environmental monitoring.</p>
    `,
    author: "Dr. Priya Sharma",
    authorRole: "Senior Research Scientist",
    date: "2025-01-15",
    category: "NGS",
    tags: ["NGS", "Sequencing", "Genomics", "Technology"],
    readTime: "8 min read",
    featured: true,
  },
  "2": {
    id: "2",
    title: "Bioinformatics Tools for Genomic Data Analysis",
    excerpt: "A comprehensive guide to essential bioinformatics tools and pipelines.",
    content: `
      <h2>Introduction to Bioinformatics Tools</h2>
      <p>Bioinformatics has become indispensable in modern genomics research. With the explosion of genomic data from NGS technologies, researchers need robust tools and pipelines to extract meaningful insights.</p>
      
      <h2>Essential Bioinformatics Tools</h2>
      <h3>Quality Control</h3>
      <ul>
        <li><strong>FastQC</strong>: Quality assessment of raw sequencing data</li>
        <li><strong>MultiQC</strong>: Aggregating results from multiple tools</li>
      </ul>
      
      <h3>Alignment Tools</h3>
      <ul>
        <li><strong>BWA</strong>: Burrows-Wheeler Aligner for short reads</li>
        <li><strong>Bowtie2</strong>: Fast and sensitive alignment</li>
        <li><strong>STAR</strong>: Spliced Transcripts Alignment for RNA-Seq</li>
      </ul>
      
      <h3>Variant Calling</h3>
      <ul>
        <li><strong>GATK</strong>: Genome Analysis Toolkit</li>
        <li><strong>FreeBayes</strong>: Bayesian variant caller</li>
        <li><strong>VarScan</strong>: Variant detection in tumor-normal pairs</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>When working with genomic data:</p>
      <ol>
        <li>Always perform quality control before analysis</li>
        <li>Use appropriate reference genomes</li>
        <li>Document your pipeline and parameters</li>
        <li>Validate results with multiple tools</li>
        <li>Keep your tools updated</li>
      </ol>
    `,
    author: "Dr. Rajesh Kumar",
    authorRole: "Bioinformatics Specialist",
    date: "2025-01-12",
    category: "Bioinformatics",
    tags: ["Bioinformatics", "Genomics", "Data Analysis", "Tools"],
    readTime: "10 min read",
    featured: true,
  },
  // Add more posts as needed...
};

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link
            href="/blog"
            className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, different post)
  const relatedPosts = Object.values(blogPosts)
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-emerald-600 mb-4">
            {getCategoryIcon(post.category)}
            <span className="font-semibold">{post.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-6 border-b">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-semibold">{post.author}</span>
              <span className="text-gray-400">• {post.authorRole}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm mb-8"
        >
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-content"
          />
        </motion.div>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
                    {getCategoryIcon(relatedPost.category)}
                    <span>{relatedPost.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{relatedPost.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

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

      <style jsx global>{`
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
          color: #374151;
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
          color: #374151;
        }
        .blog-content strong {
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
}

