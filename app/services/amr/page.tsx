"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Microscope, AlertTriangle, FlaskConical, TestTube, Dna } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AMRPage() {
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
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Antimicrobial Resistance (AMR) Research
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Combating the Global Threat of Antimicrobial Resistance
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-red-600 dark:text-red-400" />
                  What is Antimicrobial Resistance?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Antimicrobial resistance (AMR) occurs when microorganisms such as bacteria, viruses, fungi, 
                  and parasites evolve to resist the effects of antimicrobial drugs (antibiotics, antivirals, 
                  antifungals, and antiparasitics) that were previously effective against them.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  AMR is a growing global health concern that threatens our ability to treat common infectious 
                  diseases. According to the World Health Organization (WHO), AMR is one of the top 10 global 
                  public health threats facing humanity.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mechanisms of Resistance
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Enzymatic Degradation:</strong> Production of enzymes that inactivate antimicrobial drugs</li>
                  <li><strong>Target Modification:</strong> Alteration of drug target sites to prevent binding</li>
                  <li><strong>Efflux Pumps:</strong> Active removal of drugs from bacterial cells</li>
                  <li><strong>Reduced Permeability:</strong> Changes in cell membrane that prevent drug entry</li>
                  <li><strong>Biofilm Formation:</strong> Protective communities that shield bacteria from drugs</li>
                  <li><strong>Genetic Mutations:</strong> Spontaneous mutations that confer resistance</li>
                  <li><strong>Horizontal Gene Transfer:</strong> Transfer of resistance genes between bacteria</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Microscope className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Our AMR Research Services
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Resistance Mechanism Identification
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Genomic analysis of resistant strains</li>
                  <li>Identification of resistance genes</li>
                  <li>Characterization of resistance mechanisms</li>
                  <li>Expression analysis of resistance factors</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Drug Discovery and Development
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Screening for novel antimicrobial compounds</li>
                  <li>Drug repurposing studies</li>
                  <li>Combination therapy development</li>
                  <li>Synergistic drug interactions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Susceptibility Testing
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Minimum Inhibitory Concentration (MIC) determination</li>
                  <li>Minimum Bactericidal Concentration (MBC) testing</li>
                  <li>Disk diffusion assays</li>
                  <li>Automated susceptibility testing systems</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Resistance Gene Analysis
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>PCR-based detection of resistance genes</li>
                  <li>Whole genome sequencing for resistance profiling</li>
                  <li>Metagenomic analysis of resistance genes</li>
                  <li>Mobile genetic element identification</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FlaskConical className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Novel Antimicrobial Screening
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We screen natural products, synthetic compounds, and engineered molecules for antimicrobial 
                  activity against resistant pathogens.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>High-throughput screening assays</li>
                  <li>Natural product libraries</li>
                  <li>Synthetic compound screening</li>
                  <li>Peptide and protein antimicrobials</li>
                  <li>Nanoparticle-based antimicrobials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Applications of AMR Research
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Clinical Diagnostics:</strong> Rapid identification of resistant pathogens</li>
                  <li><strong>Epidemiology:</strong> Tracking resistance patterns and outbreaks</li>
                  <li><strong>Drug Development:</strong> Creating new antimicrobial agents</li>
                  <li><strong>Public Health:</strong> Informing treatment guidelines and policies</li>
                  <li><strong>Agriculture:</strong> Managing resistance in livestock and crops</li>
                  <li><strong>Environmental Monitoring:</strong> Tracking resistance in natural environments</li>
                </ul>
              </section>

              <section className="bg-red-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Global AMR Crisis
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>An estimated 700,000 deaths annually are attributed to AMR worldwide</li>
                  <li>By 2050, AMR could cause 10 million deaths per year if not addressed</li>
                  <li>Common infections are becoming harder to treat</li>
                  <li>Medical procedures become riskier without effective antibiotics</li>
                  <li>Economic impact estimated at $100 trillion by 2050</li>
                </ul>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Combating AMR: A Collaborative Effort
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Addressing AMR requires a One Health approach, recognizing that the health of humans, 
                  animals, and the environment are interconnected. Our research contributes to this global 
                  effort by developing new tools, understanding resistance mechanisms, and discovering 
                  novel antimicrobial agents.
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

