import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

// Reorder the tiers when drag ends
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const TierForm = ({ tiers, handleTierChange, setTiers }) => {
  const [tierList, setTierList] = useState(tiers);

  useEffect(() => {
    setTierList(tiers); // Sync with prop tiers
  }, [tiers]);

  // Handle the drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTiers = reorder(tierList, result.source.index, result.destination.index);
    setTierList(reorderedTiers); // Update the tier order in the local state

    // Force layout update to avoid incorrect placement
    window.requestAnimationFrame(() => {
      setTiers(reorderedTiers); // Update the parent state after ensuring layout recalculation
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tiers" direction="vertical">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {tierList.map((tier, index) => (
              <Draggable
                key={index}
                draggableId={String(index)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition duration-500 transform ${
                      snapshot.isDragging
                        ? "bg-blue-50 opacity-90 shadow-2xl"
                        : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      ...provided.draggableProps.style,
                      transition: snapshot.isDragging
                        ? "none"
                        : "transform 0.3s ease", // Smooth drag transition
                    }}
                  >
                    <h4 className="text-xl font-medium subpixel-antialiased font-sans text-black mb-4">
                      Tier {index + 1} Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Tier Name */}
                      <div className="relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Tier Name
                        </label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) =>
                            handleTierChange(index, "name", e.target.value)
                          }
                          className={`w-full px-4 py-2 border ${
                            tier.name === ""
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
                          placeholder="Enter tier name"
                        />
                      </div>

                      {/* Tier Price */}
                      <div className="relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Tier Price
                        </label>
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) =>
                            handleTierChange(index, "price", e.target.value)
                          }
                          className={`w-full px-4 py-2 border ${
                            tier.price <= 0
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
                          placeholder="Enter price"
                          min={1}
                        />
                      </div>

                      {/* Tier Capacity */}
                      <div className="relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Tier Capacity
                        </label>
                        <input
                          type="number"
                          value={tier.capacity}
                          onChange={(e) =>
                            handleTierChange(index, "capacity", e.target.value)
                          }
                          className={`w-full px-4 py-2 border ${
                            tier.capacity <= 0
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-blue-500 hover:border-blue-500 transition duration-300 shadow-md`}
                          placeholder="Enter capacity"
                          min={1}
                        />
                      </div>
                    </div>

                    {/* Drag Handle (Hamburger Icon) */}
                    <div
                      {...provided.dragHandleProps}
                      className="absolute top-2 right-2 cursor-move"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TierForm;
