"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Database, Code, Dna, BarChart3, Cpu, FileText, Dna as DnaIcon, Network, TrendingUp, Layers } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function BioinformaticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/50 border-b border-emerald-100/50 dark:border-emerald-900/50 z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="GeneVeda Biosciences" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 transition-all duration-300">GeneVeda Biosciences</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/#services" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Services
              </Link>
              <Link href="/#training" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Training
              </Link>
              <Link href="/#study-abroad" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Study Abroad
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Blog
              </Link>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      
      {/* Hero Section - Bioinformatics Theme */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 dark:bg-blue-400/20 px-4 py-2 rounded-full mb-6">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 dark:text-blue-400 font-medium">Computational Biology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Bioinformatics & Computational Analysis
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
              Transforming Complex Datasets into Clear, Meaningful Insights
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                <span className="text-white font-semibold">Genomics</span>
              </div>
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                <span className="text-white font-semibold">Transcriptomics</span>
              </div>
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                <span className="text-white font-semibold">Proteomics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-300 dark:text-blue-400 hover:text-blue-200 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Overview Card */}
          <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Database className="w-12 h-12 text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Overview</h2>
            </div>
            <p className="text-blue-100 dark:text-blue-200 leading-relaxed text-lg mb-4">
              Through our bioinformatics and computational analysis services, we transform complex datasets 
              into clear, meaningful insights. Our expertise spans genomics, transcriptomics, proteomics, 
              metagenomics, microbiome profiling, structural bioinformatics, molecular docking, and cheminformatics.
            </p>
            <p className="text-blue-100 dark:text-blue-200 leading-relaxed text-lg">
              Using robust pipelines and stringent quality checks, we deliver accurate, publication-ready reports 
              tailored to client needs. Our team combines deep domain expertise with cutting-edge computational 
              tools to extract maximum value from your data.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Genomics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all"
            >
              <Dna className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Genomics Analysis</h3>
              <p className="text-blue-100 dark:text-blue-200 mb-4">
                Complete genome analysis for research and clinical applications
              </p>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Whole genome sequencing (WGS) analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Variant calling (SNPs, indels, structural variants)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Genome assembly and annotation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Comparative genomics</span>
                </li>
              </ul>
            </motion.div>

            {/* Transcriptomics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all"
            >
              <BarChart3 className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Transcriptomics</h3>
              <p className="text-purple-100 dark:text-purple-200 mb-4">
                RNA-Seq data analysis and gene expression profiling
              </p>
              <ul className="space-y-2 text-sm text-purple-200">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span>Differential gene expression analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span>Alternative splicing detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span>Gene ontology and pathway enrichment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span>Single-cell RNA-Seq analysis</span>
                </li>
              </ul>
            </motion.div>

            {/* Proteomics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 dark:from-cyan-900/30 dark:to-teal-900/30 backdrop-blur-md rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
            >
              <FileText className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Proteomics</h3>
              <p className="text-cyan-100 dark:text-cyan-200 mb-4">
                Protein identification, quantification, and PTM analysis
              </p>
              <ul className="space-y-2 text-sm text-cyan-200">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Protein identification and quantification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Post-translational modification (PTM) analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Protein-protein interaction networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>Mass spectrometry data analysis</span>
                </li>
              </ul>
            </motion.div>

            {/* Metagenomics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-md rounded-xl p-6 border border-green-400/30 hover:border-green-400/50 transition-all"
            >
              <Network className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Metagenomics & Microbiome</h3>
              <p className="text-green-100 dark:text-green-200 mb-4">
                Comprehensive microbial community analysis
              </p>
              <ul className="space-y-2 text-sm text-green-200">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <span>16S/18S/ITS amplicon sequencing analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <span>Shotgun metagenomics analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <span>Taxonomic profiling and classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <span>Diversity analysis (alpha and beta diversity)</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Advanced Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Layers className="w-8 h-8 text-indigo-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Structural Bioinformatics</h3>
              <p className="text-blue-200 text-sm">Protein structure prediction, homology modeling, docking studies</p>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Molecular Docking</h3>
              <p className="text-blue-200 text-sm">Drug-target interactions, binding affinity prediction, virtual screening</p>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Cheminformatics</h3>
              <p className="text-blue-200 text-sm">Compound library analysis, ADMET prediction, QSAR modeling</p>
            </div>
          </div>

          {/* Workflow Section */}
          <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 dark:from-blue-900/40 dark:to-indigo-900/40 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Bioinformatics Workflow</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Data Quality Assessment", desc: "Rigorous QC to ensure data integrity" },
                { step: "2", title: "Computational Analysis", desc: "Running analyses using state-of-the-art tools" },
                { step: "3", title: "Interpretation", desc: "Translating results into biological insights" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <div className="mt-12 flex gap-4 justify-center flex-wrap">
          <Link
            href="/services/ngs"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all inline-flex items-center shadow-lg"
          >
            Explore NGS Services
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
          <Link
            href="/services/rd-services"
            className="px-6 py-3 bg-white/10 dark:bg-gray-800/50 text-white rounded-lg hover:bg-white/20 transition-all inline-flex items-center border border-white/20"
          >
            Learn about R&D Services
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
