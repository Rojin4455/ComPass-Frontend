import React from "react";
import { CiCircleMore } from "react-icons/ci";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useState } from "react";

function ShowCastAndCrew({ castAndCrew }) {
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);



  const visibleCast = showAllCast
    ? castAndCrew.cast
    : castAndCrew.cast.slice(0, 10);
  const visibleCrew = showAllCrew
    ? castAndCrew.crew
    : castAndCrew.crew.slice(0, 10);
  return (
    <>
      <div className="px-16">
        <h2 className="text-lg font-bold">Cast</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-6">
          {visibleCast
            .filter((member) => member.profile_path)
            .map((member, index) => (
              <div key={index} className="text-center">
                {" "}
                {/* Use only index */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  alt={member.name}
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-sm font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.character}</p>
              </div>
            ))}

          {castAndCrew.cast.length > 18 && !showAllCast && (
            <div className="mt-20">
              <CiCircleMore
                onClick={() => setShowAllCast(true)}
                className=""
                size={30}
              />
            </div>
          )}
          {showAllCast && (
            <div className="mt-20">
              <HiMiniArrowLeft
                onClick={() => setShowAllCast(false)}
                className=""
                size={30}
              />
            </div>
          )}
        </div>

        <h2 className="mt-8 text-lg font-bold">Crew</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-6">
          {visibleCrew
            .filter((member) => member.profile_path)
            .map((member, index) => (
              <div key={member.id + index} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  alt={member.name}
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-sm font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.job}</p>
              </div>
            ))}

          {castAndCrew.crew.length > 18 && !showAllCrew && (
            <div className="mt-14">
              <CiCircleMore
                onClick={() => setShowAllCrew(true)}
                className=""
                size={30}
              />
            </div>
          )}
          {showAllCrew && (
            <div className="mt-14">
              <HiMiniArrowLeft
                onClick={() => setShowAllCrew(false)}
                className=""
                size={30}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowCastAndCrew;
