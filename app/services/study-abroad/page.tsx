"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, GraduationCap, FileText, Award, Users, CheckCircle2, Dna, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function StudyAbroadPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
             
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Study Abroad Guidance
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your Pathway to International Education in Life Sciences
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our study abroad guidance helps learners pursue international education in biotechnology, 
                  bioinformatics, biomedical sciences, and related fields. We provide personalized support 
                  for profile evaluation, university selection, SOP/LOR preparation, scholarships, and 
                  applications, ensuring a smooth and successful transition to global programs.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Studying abroad can be a transformative experience that opens doors to new opportunities, 
                  perspectives, and career paths. However, the application process can be complex and 
                  overwhelming. That's where we come in.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Our Study Abroad Services
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Profile Evaluation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Comprehensive assessment of your academic background, research experience, publications, 
                  test scores, and career goals to identify your strengths and areas for improvement.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  University Selection
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Personalized recommendations based on your profile, research interests, budget, location 
                  preferences, and career aspirations. We help you find the best-fit universities and programs.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  SOP (Statement of Purpose) Writing
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Expert guidance to craft compelling personal statements that highlight your motivation, 
                  research interests, career goals, and fit with the program. We help you tell your story 
                  effectively.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  LOR (Letter of Recommendation) Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Help identifying appropriate recommenders, drafting effective recommendation letter templates, 
                  and ensuring your letters highlight your strengths and achievements.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Scholarship Assistance
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Information and guidance on available scholarships, fellowships, and funding opportunities. 
                  We help you identify and apply for financial aid to make your education affordable.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Application Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Step-by-step assistance throughout the application process, from document preparation to 
                  submission deadlines. We ensure your applications are complete, accurate, and submitted on time.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2 flex items-center">
               
                  Visa Guidance
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Information and support for visa applications and documentation. We help you understand 
                  requirements and prepare necessary documents for a smooth visa process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Fields We Support
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Biotechnology</li>
                    <li>Bioinformatics</li>
                    <li>Biomedical Sciences</li>
                    <li>Molecular Biology</li>
                    <li>Microbiology</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Genetics</li>
                    <li>Biochemistry</li>
                    <li>Immunology</li>
                    <li>Pharmacology</li>
                    <li>And related life sciences fields</li>
                  </ul>
                </div>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Why Choose Our Guidance?
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Personalized Approach:</strong> One-on-one consultations tailored to your specific goals</li>
                  <li><strong>Expert Knowledge:</strong> Insights into top universities and programs worldwide</li>
                  <li><strong>Proven Track Record:</strong> Successfully guided hundreds of students to their dream programs</li>
                  <li><strong>Comprehensive Support:</strong> From initial planning to visa approval and beyond</li>
                  <li><strong>Affordable Services:</strong> Competitive pricing with flexible payment options</li>
                  <li><strong>Ongoing Support:</strong> Continued assistance even after admission</li>
                </ul>
              </section>

              <section className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Success Stories
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our students have been admitted to top universities worldwide, including institutions in 
                  the USA, UK, Canada, Australia, Germany, and other countries. Many have received 
                  scholarships and are now pursuing successful careers in research, industry, and academia.
                </p>
              </section>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/services/training"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Explore Training Programs
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

