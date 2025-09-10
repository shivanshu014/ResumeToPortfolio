import React from 'react'
import {Link} from 'react-router-dom'


function Hero() {
  return (
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
          <Link to='/contact'
            className="px-6 py-3 border rounded-2xl hover:bg-slate-100"
          >
            Learn More
          </Link>
        </div>
      </header>
  )
}

export default Hero
