import React from "react";
import {FaSyncAlt, FaImage, FaCube} from "react-icons/fa";

type ViewToggleProps = {
    viewMode: "canvas" | "video" | "image";
    setViewMode: (mode: "canvas" | "video" | "image") => void;
};

const ViewToggle: React.FC<ViewToggleProps> = ({viewMode, setViewMode}) => {
    return (
        <div className="flex space-x-3">
            <button
                onClick={() => setViewMode("canvas")}
                className={`p-2 shadow-md transition-colors ${
                    viewMode === "canvas" ? "bg-accent-500 text-white" : "bg-primary-700 text-secondary-300 hover:bg-primary-600"
                }`}
            >
                <FaCube className="w-5 h-5"/>
            </button>
            <button
                onClick={() => setViewMode("video")}
                className={`p-2 shadow-md transition-colors ${
                    viewMode === "video" ? "bg-accent-500 text-white" : "bg-primary-700 text-secondary-300 hover:bg-primary-600"
                }`}
            >
                <FaSyncAlt className="w-5 h-5"/>
            </button>
            <button
                onClick={() => setViewMode("image")}
                className={`p-2 shadow-md transition-colors ${
                    viewMode === "image" ? "bg-accent-500 text-white" : "bg-primary-700 text-secondary-300 hover:bg-primary-600"
                }`}
            >
                <FaImage className="w-5 h-5"/>
            </button>
        </div>
    );
};

export default ViewToggle;
