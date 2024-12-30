import React from 'react'
import Header from './Home/Header/Header'

function MainLayout({children,page}) {
  console.log("page: ",page)

  return (
    <div>
        <Header page={page}/>

        <main className="pt-[79px] h-full min-h-screen max-h-full ">
            {children}
        </main>
    </div>
  )
}

export default MainLayout
