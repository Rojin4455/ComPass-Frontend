import React from 'react'
import Header from './Home/Header/Header'

function MainLayout({children}) {
  return (
    <div>
        <Header/>
        <main className="pt-16"> {/* Adjust pt-16 based on the header height */}
            {children}
        </main>
    </div>
  )
}

export default MainLayout
