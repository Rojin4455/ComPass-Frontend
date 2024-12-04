import React from 'react'
import Header from './Home/Header/Header'

function MainLayout({children}) {
  return (
    <div>
        <Header/>
        <main className="pt-[79px] h-full min-h-screen max-h-full ">
            {children}
        </main>
    </div>
  )
}

export default MainLayout
