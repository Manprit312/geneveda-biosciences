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
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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

  const services = [
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "R&D Services",
      description: "Supporting innovation across molecular biology, biotechnology, aptamer, NGS, AMR, and applied life sciences.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Bioinformatics Analysis",
      description: "Transforming complex datasets into clear, meaningful insights through genomics, transcriptomics, and proteomics.",
    },
    {
      icon: <Dna className="w-8 h-8" />,
      title: "Next-Generation Sequencing",
      description: "End-to-end sequencing support with whole genome, RNA-Seq, metagenomics, and variant analysis.",
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Diagnostics & Aptamers",
      description: "Advanced diagnostic solutions and aptamer development for precision medicine and research.",
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "AMR Research",
      description: "Comprehensive antimicrobial resistance research and analysis services.",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Training Programs",
      description: "Industry-focused training in molecular biology, bioinformatics, coding for biology, and NGS data analysis.",
    },
  ];

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Dna className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">GeneVeda Biosciences</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#services" className="text-gray-700 hover:text-emerald-600 transition">
                Services
              </Link>
              <Link href="#training" className="text-gray-700 hover:text-emerald-600 transition">
                Training
              </Link>
              <Link href="#study-abroad" className="text-gray-700 hover:text-emerald-600 transition">
                Study Abroad
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-emerald-600 transition">
                About
              </Link>
              <Link
                href="#contact"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advancing Bioscience Research,
              <br />
              <span className="text-emerald-600">Innovation & Global Careers</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              A multidisciplinary biotech organization dedicated to advancing research, technology, and education.
              We upskill the biology community and help students, researchers, and professionals access
              international opportunities in life sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-emerald-600"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for research, analysis, and innovation in biosciences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-emerald-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Division */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                R&D Division: Supporting Innovation
              </h2>
              <p className="text-lg text-gray-700 mb-4">
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
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8"
            >
              <FlaskConical className="w-24 h-24 text-emerald-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Research-Driven Solutions
              </h3>
              <p className="text-gray-700 text-center">
                We provide reliable and research-driven solutions tailored to your specific needs,
                from concept to completion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bioinformatics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bioinformatics & Computational Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition"
              >
                <Database className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">{field}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="training" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Industry-Focused Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition"
              >
                <BookCheck className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{program}</h3>
                <p className="text-gray-600">
                  Comprehensive training with hands-on experience and industry-relevant projects
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Section */}
      <section id="study-abroad" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Globe className="w-16 h-16 text-emerald-600 mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Global Study Abroad Guidance
              </h2>
              <p className="text-lg text-gray-700 mb-6">
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
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2"
              >
                Get Guidance <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h3>
              <div className="space-y-4">
                {["USA", "UK", "Canada", "Australia", "Germany", "Netherlands"].map(
                  (country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition"
                    >
                      <span className="font-medium text-gray-900">{country}</span>
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About GeneVeda</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                <div className="text-emerald-600 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Send us your queries and we'll get back to you soon</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@geneveda.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 XXX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="w-8 h-8 text-emerald-400" />
                <span className="text-xl font-bold">GeneVeda Biosciences</span>
              </div>
              <p className="text-gray-400">
                Advancing bioscience research, innovation & global careers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>R&D Services</li>
                <li>Bioinformatics</li>
                <li>NGS Services</li>
                <li>Training Programs</li>
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
