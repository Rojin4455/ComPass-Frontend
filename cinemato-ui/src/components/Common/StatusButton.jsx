import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";

const StatusButton = ({ status, handleClick, clickParams = null }) => {
  const getButtonStyle = () => {
    switch (status) {
      case "loading":
        return "bg-gray-500 cursor-not-allowed";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-primary hover:bg-primaryhover";
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <FaSpinner className="animate-spin" />
            Processing...
          </>
        );
      case "success":
        return (
          <>
            <FaCheck />
            Success!
          </>
        );
      case "error":
        return (
          <>
            <FaTimes />
            Failed
          </>
        );
      default:
        return "Book Tickets";
    }
  };

  return (
    <button
      className={`w-full py-2 rounded-md transition duration-300 font-semibold text-white flex items-center justify-center gap-2 ${getButtonStyle()}`}
      onClick={() => (clickParams ? handleClick(...clickParams) : handleClick())}
      disabled={status === "loading"}
    >
      {getButtonContent()}
    </button>
  );
};

export default StatusButton;
