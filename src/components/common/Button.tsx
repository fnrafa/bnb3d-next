import React from "react";
import {motion} from "framer-motion";

interface Props {
    label?: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
                                     label,
                                     onClick,
                                     type = "button",
                                     children,
                                     fullWidth = false,
                                     icon,
                                     iconPosition = "left",
                                     disabled = false,
                                 }) => {
    const buttonStyles = `
        relative font-semibold flex items-center justify-center gap-2
        rounded-md text-base p-3 transition-all duration-300 shadow-lg
        bg-button text-button-text focus:ring-2 focus:ring-secondary
        hover:brightness-110 hover:shadow-[0_0_10px_var(--tw-colors-highlight)]
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    return (
        <div className={`${fullWidth ? "w-full" : "w-auto"} flex justify-center items-center`}>
            <motion.div
                className={`relative ${fullWidth ? "w-full" : "w-auto"} ${
                    disabled ? "pointer-events-none" : ""
                }`}
                whileHover={{scale: disabled ? 1 : 1.05}}
                whileTap={{scale: disabled ? 1 : 0.95}}
            >
                <button
                    onClick={disabled ? undefined : onClick}
                    type={type as "button" | "submit" | "reset"}
                    disabled={disabled}
                    className={`${buttonStyles} ${fullWidth ? "w-full" : "w-auto"}`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {icon && iconPosition === "left" && <span>{icon}</span>}
                        {children || label}
                        {icon && iconPosition === "right" && <span>{icon}</span>}
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default Button;
