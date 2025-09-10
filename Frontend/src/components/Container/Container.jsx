import React from 'react'

function Container({children}) {
  return (
     <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800 antialiased pt-20">
        {children}
    </div>
  )
}

export default Container
