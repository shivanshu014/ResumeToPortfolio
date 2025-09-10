import React from "react";
import { Upload, Layout, Globe, Download } from "lucide-react";

function Process() {
  return (
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

  )
}

export default Process
