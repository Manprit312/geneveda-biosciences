"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, GraduationCap, BookOpen, Code, Database, FlaskConical, Users, Dna, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

export default function TrainingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch dynamic service content
    fetch("/api/services?slug=training")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.service) {
          setService(data.service);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // If dynamic content exists, show it
  if (!loading && service && service.content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  Blog
                </Link>
                <ThemeToggle />
              </div>
              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>
        
        <div className="container mx-auto px-4 py-16 pt-24">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h1>
              </div>

              {service.description && (
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  {service.description}
                </p>
              )}

              {service.content && (
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Otherwise show static content (fallback)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
      </header>

      {/* Mobile Menu - Outside header for proper z-index */}
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
                  href="/#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Services
                </Link>
                <Link
                  href="/#training"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Training
                </Link>
                <Link
                  href="/#study-abroad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Study Abroad
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Blog
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Home
                </Link>
              </div>
            </motion.div>
          </>
        )}
      
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
              <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Industry-Focused Training Programs
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Building Job-Ready Technical Skills Through Practical Exposure and Expert Mentoring
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  GeneVeda Biosciences offers industry-focused training programs in molecular biology, 
                  microbiology, biotechnology, bioinformatics, coding for biology, and NGS data analysis. 
                  Our training combines practical exposure, real datasets, and expert mentoring to build 
                  strong, job-ready technical skills for students and professionals.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  We understand that theoretical knowledge alone is not enough in today's competitive job 
                  market. That's why our training programs emphasize hands-on experience with real-world 
                  datasets and industry-standard tools and techniques.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FlaskConical className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Molecular Biology Training
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>DNA/RNA extraction and purification techniques</li>
                  <li>PCR optimization and troubleshooting</li>
                  <li>Gene cloning and vector construction</li>
                  <li>Protein expression and purification</li>
                  <li>Western blotting and immunodetection</li>
                  <li>Cell culture and transfection</li>
                  <li>qRT-PCR and gene expression analysis</li>
                  <li>Gel electrophoresis and DNA sequencing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Microbiology Training
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Microbial culture techniques</li>
                  <li>Sterile technique and aseptic handling</li>
                  <li>Microbial identification methods</li>
                  <li>Antimicrobial susceptibility testing</li>
                  <li>Quality control in microbiology</li>
                  <li>Microbial diversity analysis</li>
                  <li>Environmental microbiology</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FlaskConical className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Biotechnology Training
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Fermentation technology</li>
                  <li>Downstream processing</li>
                  <li>Bioprocess optimization</li>
                  <li>Quality assurance and validation</li>
                  <li>Regulatory compliance</li>
                  <li>Scale-up processes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Bioinformatics Training
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Genomics data analysis using R and Python</li>
                  <li>Transcriptomics and RNA-Seq analysis</li>
                  <li>Proteomics data interpretation</li>
                  <li>Metagenomics and microbiome analysis</li>
                  <li>Phylogenetic analysis</li>
                  <li>Statistical analysis for biological data</li>
                  <li>Data visualization and reporting</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Coding for Biology
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Python programming for biologists</li>
                  <li>R programming for data analysis</li>
                  <li>Bash scripting for bioinformatics</li>
                  <li>Data manipulation and cleaning</li>
                  <li>Statistical analysis and modeling</li>
                  <li>Automation of repetitive tasks</li>
                  <li>Version control with Git</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  NGS Data Analysis Training
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Quality control of sequencing data</li>
                  <li>Read alignment and mapping</li>
                  <li>Variant calling and annotation</li>
                  <li>RNA-Seq analysis pipeline</li>
                  <li>Metagenomics analysis</li>
                  <li>Genome assembly</li>
                  <li>Interpretation and reporting</li>
                </ul>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  What Makes Our Training Unique?
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Real Datasets:</strong> Work with actual research data, not simulated examples</li>
                  <li><strong>Expert Mentoring:</strong> Learn from experienced professionals in the field</li>
                  <li><strong>Industry-Relevant Skills:</strong> Focus on techniques and tools used in real-world settings</li>
                  <li><strong>Flexible Learning:</strong> Options for in-person, online, and hybrid formats</li>
                  <li><strong>Hands-On Practice:</strong> Extensive laboratory and computational exercises</li>
                  <li><strong>Certification:</strong> Receive certificates upon completion to enhance your resume</li>
                  <li><strong>Career Support:</strong> Guidance on job applications and interview preparation</li>
                </ul>
              </section>

              <section className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Who Should Attend?
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Students pursuing degrees in life sciences</li>
                  <li>Researchers looking to upskill</li>
                  <li>Faculty members seeking professional development</li>
                  <li>Industry professionals transitioning to new roles</li>
                  <li>Anyone interested in building technical skills in biosciences</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/services/study-abroad"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Learn about Study Abroad
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

