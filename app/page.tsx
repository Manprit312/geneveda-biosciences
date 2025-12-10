"use client";

import { motion } from "framer-motion";
import {
  Dna,
  Microscope,
  GraduationCap,
  Globe,
  FlaskConical,
  Database,
  BookOpen,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Brain,
  TestTube,
  Code,
  BookCheck,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      if (data.success && data.services) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setServicesLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      FlaskConical: <FlaskConical className="w-8 h-8" />,
      Database: <Database className="w-8 h-8" />,
      Dna: <Dna className="w-8 h-8" />,
      TestTube: <TestTube className="w-8 h-8" />,
      Microscope: <Microscope className="w-8 h-8" />,
      GraduationCap: <GraduationCap className="w-8 h-8" />,
      Globe: <Globe className="w-8 h-8" />,
    };
    return icons[iconName] || <Globe className="w-8 h-8" />;
  };

  const trainingPrograms = [
    "Molecular Biology",
    "Microbiology",
    "Biotechnology",
    "Bioinformatics",
    "Coding for Biology",
    "NGS Data Analysis",
  ];

  const stats = [
    { number: "500+", label: "Students Trained" },
    { number: "100+", label: "Research Projects" },
    { number: "50+", label: "Global Partnerships" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/50 border-b border-emerald-100/50 dark:border-emerald-900/50 z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="GeneVeda Biosciences" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold gradient-text transition-all duration-300">GeneVeda Biosciences</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#services" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Services
              </Link>
              <Link href="#training" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Training
              </Link>
              <Link href="#study-abroad" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Study Abroad
              </Link>
              <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Blog
              </Link>
              <ThemeToggle />
              <Link
                href="#contact"
                className="btn-premium text-white px-6 py-2.5 rounded-lg font-semibold"
              >
                Contact Us
              </Link>
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[70] overflow-y-auto pt-16"
            >
              <div className="p-6 space-y-4">
                <Link
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Services
                </Link>
                <Link
                  href="#training"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Training
                </Link>
                <Link
                  href="#study-abroad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Study Abroad
                </Link>
                <Link
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium py-2"
                >
                  Blog
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block btn-premium text-white px-6 py-2.5 rounded-lg font-semibold text-center mt-4"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-blue-50 dark:from-emerald-950/30 dark:via-emerald-900/20 dark:to-blue-950/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold border border-emerald-200 dark:border-emerald-800">
                Leading Bioscience Innovation
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Advancing Bioscience Research,
              <br />
              <span className="gradient-text">Innovation & Global Careers</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              A multidisciplinary biotech organization dedicated to advancing research, technology, and education.
              We upskill the biology community and help students, researchers, and professionals access
              international opportunities in life sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="btn-premium text-white px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 px-8 py-3.5 rounded-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all border-2 border-emerald-600 dark:border-emerald-500 hover:border-blue-600 dark:hover:border-blue-500 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions for research, analysis, and innovation in biosciences
            </p>
          </motion.div>

          {servicesLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No services available yet. Add services from the admin panel.
                </div>
              ) : (
                services.map((service, index) => (
                  <Link key={service.id} href={`/services/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                  className="card-premium p-6 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                      <div className="text-emerald-600 dark:text-emerald-400 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {getIcon(service.icon || "Globe")}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {service.title}
                      </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
              </motion.div>
              </Link>
                ))
              )}
          </div>
          )}
        </div>
      </section>

      {/* R&D Division */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                R&D Division: Supporting Innovation
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Our R&D division supports innovation across molecular biology, biotechnology, aptamer,
                NGS, AMR, microbiology, and applied life sciences. We assist research labs, startups,
                and industries in:
              </p>
              <ul className="space-y-3">
                {[
                  "Designing experiments",
                  "Optimizing protocols",
                  "Validating new technologies",
                  "Generating high-quality scientific data",
                  "Early-stage concept development",
                  "Full project execution",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg dark:shadow-gray-900/50"
            >
              <div className="flex justify-center mb-6">
                <FlaskConical className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                Research-Driven Solutions
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                We provide reliable and research-driven solutions tailored to your specific needs,
                from concept to completion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bioinformatics Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Bioinformatics & Computational Analysis
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transform complex datasets into clear, meaningful insights with our expertise in:
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Genomics",
              "Transcriptomics",
              "Proteomics",
              "Metagenomics",
              "Microbiome Profiling",
              "Structural Bioinformatics",
              "Molecular Docking",
              "Cheminformatics",
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-premium p-4 rounded-lg text-center"
              >
                <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-blue-400 mx-auto mb-2 transition-colors" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">{field}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="training" className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry-Focused Training Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Build strong, job-ready technical skills through practical exposure, real datasets, and
              expert mentoring
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transition-all"
              >
                <BookCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{program}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive training with hands-on experience and industry-relevant projects
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Section */}
      <section id="study-abroad" className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-900/20 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Globe className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Global Study Abroad Guidance
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Pursue international education in biotechnology, bioinformatics, biomedical sciences,
                and related fields with our personalized support:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Profile evaluation",
                  "University selection",
                  "SOP/LOR preparation",
                  "Scholarship assistance",
                  "Application support",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/services/study-abroad"
                className="btn-premium text-white px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-premium p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Destinations</h3>
              <div className="space-y-4">
                {["USA", "UK", "Canada", "Australia", "Germany", "Netherlands"].map(
                  (country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 dark:hover:from-emerald-950/30 dark:hover:to-blue-950/30 transition border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{country}</span>
                      <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About GeneVeda</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We integrate science, technology, and education to create pathways for innovation,
              growth, and future-ready bioscience careers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-10 h-10" />,
                title: "Innovation",
                description: "Advancing scientific discovery through cutting-edge research and technology",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Community",
                description: "Upskilling the biology community and strengthening technical skills",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Excellence",
                description: "Delivering high-quality, publication-ready results and insights",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-emerald-600 dark:text-emerald-400 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Send us your queries and we'll get back to you soon</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">info@geneveda.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">+91 XXX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-400">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="card-premium p-8 rounded-xl"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent hover:border-emerald-300 dark:hover:border-emerald-600 transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent hover:border-emerald-300 dark:hover:border-emerald-600 transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent hover:border-emerald-300 dark:hover:border-emerald-600 transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent hover:border-emerald-300 dark:hover:border-emerald-600 transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-premium text-white px-6 py-3.5 rounded-lg font-semibold"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800 dark:border-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="w-8 h-8 text-emerald-400 dark:text-emerald-400 transition-colors duration-300" />
                <span className="text-xl font-bold gradient-text transition-all duration-300">GeneVeda Biosciences</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500">
                Advancing bioscience research, innovation & global careers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-gray-200">Services</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">R&D Services</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Bioinformatics</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">NGS Services</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Training Programs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-gray-200">Resources</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <Link href="/services/study-abroad">
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Study Abroad</li>
                </Link>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Training Courses</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Research Support</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors cursor-pointer">Career Guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-gray-200">Contact</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors">info@geneveda.com</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors">+91 XXX XXX XXXX</li>
                <li className="hover:text-emerald-400 dark:hover:text-emerald-500 transition-colors">Chennai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>© 2025 GeneVeda Biosciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
