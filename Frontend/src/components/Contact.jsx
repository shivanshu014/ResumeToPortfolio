import React from 'react'

function Contact() {
  return (
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
  )
}

export default Contact
