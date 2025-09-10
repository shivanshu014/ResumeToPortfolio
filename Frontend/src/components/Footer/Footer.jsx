import React from 'react'

function Footer() {
  return (
      <footer className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
      </footer>
  )
}

export default Footer
