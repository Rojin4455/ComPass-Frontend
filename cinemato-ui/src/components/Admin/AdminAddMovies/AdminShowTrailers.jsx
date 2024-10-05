import React from 'react'
import { IoClose } from "react-icons/io5";

function AdminShowTrailers({showTrailer,selectedTrailer,handleCloseModal}) {

  return (
    <>

<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                {/* Container for modal content */}
                <div className="relative bg-white rounded-lg w-full max-w-4xl h-80">
                    {/* Close button outside the trailer box */}
                    <button
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 z-50"
                        onClick={handleCloseModal}
                    >
                        <IoClose/>
                    </button>
                    {/* Trailer box */}
                    <div className="relative w-full h-full">
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
                            title={selectedTrailer}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
    </>
  )
}

export default AdminShowTrailers
