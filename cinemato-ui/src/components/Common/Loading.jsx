import React from 'react'

function Loading({loading}) {
  return (
    <>
    {loading &&   <div className="fixed inset-0 flex items-center justify-center my-4">
    <div className="flex space-x-2 animate-pulse">
      <div className="w-3 h-3 bg-secondary"></div>
      <div className="w-3 h-3 bg-secondary"></div>
      <div className="w-3 h-3 bg-secondary rounded-full"></div>
    </div>
    <p className="text-secondary text-lg ml-2">Loading more movies...</p>
  </div>}
    </>
  )
}

export default Loading