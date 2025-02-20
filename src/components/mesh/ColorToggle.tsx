import React from "react";
import {FaPalette} from "react-icons/fa";

type ColorToggleProps = {
    useColor: boolean;
    toggleColor: () => void;
};

const ColorToggle: React.FC<ColorToggleProps> = ({useColor, toggleColor}) => {
    return (
        <button
            onClick={toggleColor}
            className={`p-2 shadow-md transition-colors ${
                useColor ? "bg-accent-500 text-white" : "bg-primary-700 text-secondary-300 hover:bg-primary-600"
            }`}
        >
            <FaPalette className="w-5 h-5"/>
        </button>
    );
};

export default ColorToggle;
