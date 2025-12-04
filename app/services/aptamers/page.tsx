"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Dna, Target, FlaskConical, TestTube, Microscope, Dna as DnaIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AptamersPage() {
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
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Aptamers
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Powerful Alternatives to Antibodies in Diagnostics and Therapeutics
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  What are Aptamers?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Aptamers are single-stranded DNA or RNA molecules that can bind to specific target molecules 
                  with high affinity and specificity. They are often referred to as "chemical antibodies" 
                  because they function similarly to antibodies but are made of nucleic acids rather than proteins.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Discovered in the 1990s, aptamers have emerged as powerful tools in diagnostics, therapeutics, 
                  and research. They offer several advantages over traditional antibodies, including easier 
                  synthesis, better stability, and the ability to target a wider range of molecules.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FlaskConical className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  SELEX Process
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  SELEX (Systematic Evolution of Ligands by EXponential enrichment) is the process used to 
                  identify aptamers that bind to a specific target. It involves multiple rounds of selection 
                  and amplification to enrich for sequences with high binding affinity.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Library generation with random sequences</li>
                  <li>Binding selection against target molecule</li>
                  <li>Partitioning bound from unbound sequences</li>
                  <li>Amplification of selected sequences</li>
                  <li>Multiple rounds of selection and enrichment</li>
                  <li>Sequencing and characterization of aptamers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TestTube className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Advantages of Aptamers
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Easier Synthesis:</strong> Can be chemically synthesized, eliminating the need for animals</li>
                  <li><strong>Better Stability:</strong> More stable than antibodies, especially at high temperatures</li>
                  <li><strong>Smaller Size:</strong> Can penetrate tissues more effectively</li>
                  <li><strong>Reversible Binding:</strong> Can be designed to bind and release targets</li>
                  <li><strong>Modification Flexibility:</strong> Easy to modify with fluorescent tags, nanoparticles, etc.</li>
                  <li><strong>No Batch-to-Batch Variation:</strong> Consistent quality through chemical synthesis</li>
                  <li><strong>Wide Target Range:</strong> Can bind to proteins, small molecules, cells, and even whole organisms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Microscope className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Applications
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Diagnostics
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Biosensors for disease detection</li>
                  <li>Point-of-care diagnostic devices</li>
                  <li>Biomarker detection</li>
                  <li>Food safety testing</li>
                  <li>Environmental monitoring</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Therapeutics
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Drug delivery systems</li>
                  <li>Targeted therapy</li>
                  <li>Antiviral and antibacterial agents</li>
                  <li>Cancer treatment</li>
                  <li>Anticoagulant therapy (e.g., pegaptanib for macular degeneration)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Research Tools
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Protein purification</li>
                  <li>Cell sorting and isolation</li>
                  <li>Imaging and visualization</li>
                  <li>Functional studies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Aptamer Services
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>SELEX protocol design and optimization</li>
                  <li>Aptamer selection and screening</li>
                  <li>Aptamer synthesis and modification</li>
                  <li>Binding affinity and specificity analysis</li>
                  <li>Structural characterization</li>
                  <li>Diagnostic assay development</li>
                  <li>Therapeutic aptamer optimization</li>
                  <li>Custom aptamer design for specific targets</li>
                </ul>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Future of Aptamers
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The field of aptamers is rapidly evolving, with ongoing research focused on improving selection 
                  methods, expanding target ranges, and developing new applications. As the technology matures, 
                  aptamers are expected to play an increasingly important role in personalized medicine, 
                  precision diagnostics, and targeted therapeutics.
                </p>
              </section>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/services/rd-services"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
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

