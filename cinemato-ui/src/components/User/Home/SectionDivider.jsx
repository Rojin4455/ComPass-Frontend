import React from 'react';

function SectionDivider({ title }) {
    return (
<div className="relative py-10 md:py-12 w-full flex items-center justify-center mt-10">
    {/* Banner Image */}
    <img
        src='/assets/divider-new.png'
        alt="Banner"
        className="absolute h-24 md:h-32 w-[80%] md:w-[85%] object-cover rounded-lg" // Adjust height and width, and add rounded edges
    />
    {/* Optional: Uncomment if you want the border and title */}
    {/* <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
    </div>
    <span className="relative bg-white px-6 py-2 text-lg font-semibold text-gray-600 md:text-xl shadow-md rounded">
        {title}
    </span> */}
</div>

    );
}

export default SectionDivider;
