import React from 'react'

function Footer() {
  return (
    <div className='mt-4 mb-0 w-screen text-center bg-gray-900 py-4'>
      <p className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} ResumeToPortfolio. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
