import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";

interface LoaderProps {
    size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({size = "medium"}) => {
    const sizeValue = size === "small" ? 48 : size === "large" ? 80 : 64;

    return (
        <motion.div
            className="flex justify-center items-center"
            animate={{scale: [1, 1.2, 1]}}
            transition={{duration: 1.2, repeat: Infinity, ease: "easeInOut"}}
        >
            <Image
                src="/icon.png"
                alt="Loading..."
                width={sizeValue}
                height={sizeValue}
                priority
            />
            <span className="sr-only">Loading...</span>
        </motion.div>
    );
};

export default Loader;
