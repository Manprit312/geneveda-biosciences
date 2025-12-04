"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Dna, Microscope, TestTube, Code, Database, Dna as DnaIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RDServicesPage() {
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
              <FlaskConical className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                R&D Services
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Driving Innovation in Molecular Biology, Biotechnology, and Applied Life Sciences
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our R&D division supports innovation across molecular biology, biotechnology, aptamer development, 
                  next-generation sequencing (NGS), antimicrobial resistance (AMR) research, microbiology, and applied 
                  life sciences. We assist research labs, startups, and industries in designing experiments, optimizing 
                  protocols, validating new technologies, and generating high-quality scientific data.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Whether it's early-stage concept development or full project execution, we provide reliable and 
                  research-driven solutions tailored to your specific needs.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Dna className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Molecular Biology Research
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>DNA/RNA extraction and purification</li>
                  <li>PCR optimization and validation</li>
                  <li>Gene cloning and expression</li>
                  <li>Gene expression analysis (qRT-PCR)</li>
                  <li>Protein expression and purification</li>
                  <li>Western blotting and immunodetection</li>
                  <li>Cell culture and transfection</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TestTube className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Biotechnology Applications
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Recombinant protein production</li>
                  <li>Enzyme engineering and optimization</li>
                  <li>Fermentation process development</li>
                  <li>Downstream processing optimization</li>
                  <li>Bioprocess scale-up</li>
                  <li>Quality control and validation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Microscope className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Aptamer Development
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Aptamers are single-stranded DNA or RNA molecules that can bind to specific target molecules with 
                  high affinity and specificity. They are emerging as powerful alternatives to antibodies in diagnostics 
                  and therapeutics.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>SELEX (Systematic Evolution of Ligands by EXponential enrichment) protocol design</li>
                  <li>Aptamer synthesis and modification</li>
                  <li>Binding affinity and specificity analysis</li>
                  <li>Diagnostic assay development</li>
                  <li>Therapeutic aptamer optimization</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Next-Generation Sequencing (NGS) Applications
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Custom sequencing project design</li>
                  <li>Method development and optimization</li>
                  <li>Quality control and validation</li>
                  <li>Library preparation optimization</li>
                  <li>Sequencing data interpretation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Antimicrobial Resistance (AMR) Research
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Antimicrobial resistance is a growing global health concern. Our AMR research services help 
                  identify resistance mechanisms and develop strategies to combat resistant pathogens.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Resistance mechanism identification</li>
                  <li>Drug discovery and development</li>
                  <li>Susceptibility testing</li>
                  <li>Resistance gene analysis</li>
                  <li>Novel antimicrobial screening</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Microbiology Services
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Microbial identification and characterization</li>
                  <li>Culture optimization and maintenance</li>
                  <li>Strain development and engineering</li>
                  <li>Antimicrobial susceptibility testing</li>
                  <li>Microbial diversity analysis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Applied Life Sciences
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Translational research support</li>
                  <li>Product development and optimization</li>
                  <li>Regulatory compliance assistance</li>
                  <li>Technology transfer support</li>
                  <li>Intellectual property guidance</li>
                </ul>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Why Choose Our R&D Services?
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Experienced team of scientists and researchers</li>
                  <li>State-of-the-art laboratory facilities</li>
                  <li>Customized solutions for your specific needs</li>
                  <li>Rigorous quality control and validation</li>
                  <li>Fast turnaround times</li>
                  <li>Competitive pricing</li>
                  <li>Confidentiality and data security</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/services/bioinformatics"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Learn about Bioinformatics
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
              <Link
                href="/services/ngs"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                Explore NGS Services
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
