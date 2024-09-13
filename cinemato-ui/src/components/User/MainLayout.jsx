import React from 'react'
import Header from './Home/Header/Header'

function MainLayout({children}) {
  return (
    <div>
        <Header/>
        <main className="pt-14 h-screen">
            {children}
        </main>
    </div>
  )
}

export default MainLayout
