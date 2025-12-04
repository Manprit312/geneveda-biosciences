"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Dna, FileCode, BarChart3, Microscope, Zap, Dna as DnaIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function NGSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
      
      <div className="container mx-auto px-4 py-16 pt-24">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <Dna className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Next-Generation Sequencing (NGS) Services
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              End-to-End Sequencing Support Using Advanced Platforms and Controlled Workflows
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our NGS services offer end-to-end sequencing support using advanced platforms and controlled 
                  workflows. We provide whole genome and exome sequencing, RNA-Seq, amplicon sequencing 
                  (16S/18S/ITS), shotgun metagenomics, and variant analysis.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  From sample processing to data interpretation, our team ensures precision, clarity, and fast 
                  turnaround. We understand that reliable sequencing data is the foundation of modern biological 
                  research, and we are committed to delivering the highest quality results.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Dna className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Whole Genome Sequencing (WGS)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Whole genome sequencing provides a comprehensive view of an organism's complete DNA sequence. 
                  It's essential for identifying genetic variants, understanding disease mechanisms, and studying 
                  evolutionary relationships.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Complete genome analysis for research and clinical applications</li>
                  <li>De novo genome assembly</li>
                  <li>Reference-based alignment and variant calling</li>
                  <li>Structural variant detection</li>
                  <li>Copy number variation (CNV) analysis</li>
                  <li>Genome annotation and functional analysis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileCode className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Exome Sequencing
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Exome sequencing focuses on the protein-coding regions of the genome (exons), which represent 
                  about 1-2% of the genome but contain the majority of disease-causing variants.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Targeted sequencing of protein-coding regions</li>
                  <li>Variant discovery and annotation</li>
                  <li>Disease gene identification</li>
                  <li>Rare variant analysis</li>
                  <li>Clinical exome sequencing</li>
                  <li>Cost-effective alternative to whole genome sequencing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  RNA-Seq (Transcriptome Sequencing)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  RNA-Seq provides a comprehensive view of the transcriptome, enabling the identification of 
                  differentially expressed genes, alternative splicing events, and novel transcripts.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Transcriptome analysis and gene expression profiling</li>
                  <li>Differential gene expression analysis</li>
                  <li>Alternative splicing detection</li>
                  <li>Novel transcript discovery</li>
                  <li>Long non-coding RNA (lncRNA) identification</li>
                  <li>Single-cell RNA-Seq analysis</li>
                  <li>Time-series expression studies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Microscope className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Amplicon Sequencing (16S/18S/ITS)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Amplicon sequencing targets specific regions of the genome, commonly used for microbial 
                  identification and diversity studies. The 16S rRNA gene is used for bacteria, 18S for 
                  eukaryotes, and ITS (Internal Transcribed Spacer) for fungi.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>16S rRNA sequencing for bacterial identification</li>
                  <li>18S rRNA sequencing for eukaryotic diversity</li>
                  <li>ITS sequencing for fungal identification</li>
                  <li>Microbial community profiling</li>
                  <li>Diversity analysis (alpha and beta diversity)</li>
                  <li>Taxonomic classification</li>
                  <li>Phylogenetic analysis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Shotgun Metagenomics
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Shotgun metagenomics sequences all DNA in a sample without PCR amplification, providing 
                  an unbiased view of the entire microbial community and its functional potential.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Comprehensive microbial community analysis</li>
                  <li>No PCR bias</li>
                  <li>Functional gene identification</li>
                  <li>Metabolic pathway analysis</li>
                  <li>Antimicrobial resistance gene detection</li>
                  <li>Viral and phage identification</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Variant Analysis
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Variant analysis identifies genetic variations (SNPs, indels, structural variants) and 
                  assesses their potential impact on protein function and disease.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>SNP and indel calling</li>
                  <li>Variant annotation and prioritization</li>
                  <li>Pathogenicity prediction</li>
                  <li>Population frequency analysis</li>
                  <li>Clinical interpretation</li>
                  <li>Variant validation</li>
                </ul>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our NGS Workflow
                </h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Sample Quality Control:</strong> Rigorous QC to ensure sample integrity and quality</li>
                  <li><strong>Library Preparation:</strong> Optimized protocols for various sample types and applications</li>
                  <li><strong>Sequencing:</strong> State-of-the-art platforms with high throughput capacity</li>
                  <li><strong>Data Processing:</strong> Automated pipelines with quality filtering and error correction</li>
                  <li><strong>Analysis & Interpretation:</strong> Comprehensive reports with actionable insights and visualizations</li>
                </ol>
              </section>

              <section className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Why Choose Our NGS Services?
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Advanced sequencing platforms (Illumina, PacBio, Oxford Nanopore)</li>
                  <li>Experienced team with expertise in various NGS applications</li>
                  <li>Rigorous quality control at every step</li>
                  <li>Fast turnaround times</li>
                  <li>Comprehensive data analysis and interpretation</li>
                  <li>Publication-ready reports and visualizations</li>
                  <li>Competitive pricing</li>
                  <li>Support for projects of any scale</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                href="/services/bioinformatics"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Learn about Bioinformatics
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
              <Link
                href="/services/rd-services"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                Explore R&D Services
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

