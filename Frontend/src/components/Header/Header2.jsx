import React from "react";
import { Upload, Layout, Globe, Download } from "lucide-react";
import Header from "./Header";
import {Link} from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800 antialiased pt-20">
      {/* NAVBAR */}
      <Header />

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Turn your <span className="text-yellow-500">Resume</span> into a  
          <br /> Stunning <span className="text-yellow-500">Portfolio Website</span>
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Upload your resume, choose from modern templates, and instantly generate a personal portfolio website.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to='/create'
            className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-2xl shadow hover:bg-yellow-600"
          >
            Get Started
          </Link>
          <a
            href="#howitworks"
            className="px-6 py-3 border rounded-2xl hover:bg-slate-100"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="howitworks" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold text-center">How It Works</h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Upload size={28} />, title: "Upload Resume", desc: "Upload your resume in PDF or DOCX format." },
            { icon: <Layout size={28} />, title: "Pick a Template", desc: "Choose from beautiful, customizable portfolio templates." },
            { icon: <Globe size={28} />, title: "Publish Website", desc: "Instantly get a live portfolio site to share with the world." },
          ].map((step, i) => (
            <div key={i} className="p-6 rounded-2xl shadow bg-white text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4">
                {step.icon}
              </div>
              <h4 className="font-semibold text-lg">{step.title}</h4>
              <p className="text-sm text-slate-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATE PREVIEW */}
      <section id="templates" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold text-center">Choose a Template</h3>
        <p className="text-center text-slate-600 mt-2">Select from modern portfolio designs.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-2xl border shadow bg-white hover:shadow-md transition">
              <div className="h-64 bg-slate-100 rounded-xl mb-4"></div>
              <h4 className="font-medium">Portfolio Template {i}</h4>
              <button className="mt-3 px-4 py-2 text-sm bg-slate-900 text-white rounded-xl flex items-center gap-2">
                <Download size={16} /> Use Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-8 shadow bg-white text-center">
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <p className="text-slate-600 mt-2">Have questions? We’d love to help.</p>
          <a
            href="mailto:support@portfoliobuilder.com"
            className="mt-6 inline-block px-6 py-3 rounded-2xl bg-yellow-500 text-white shadow"
          >
            support@portfoliobuilder.com
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
      </footer>
    </div>
  );
}
