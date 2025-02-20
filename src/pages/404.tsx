import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {FaArrowLeft} from "react-icons/fa";
import {motion} from "framer-motion";

const Custom404: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-6 sm:px-10 lg:px-24">
            <motion.div
                className="text-center space-y-6 p-6 sm:p-8 md:p-10 lg:p-12 max-w-md sm:max-w-lg w-full bg-primary/70 backdrop-blur-md shadow-lg rounded-xl border border-secondary"
                initial={{opacity: 0, y: -20}}

                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div className="flex justify-center">
                    <motion.div
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        transition={{duration: 0.6, repeat: Infinity, repeatType: "reverse"}}
                    >
                        <Image
                            src="/icon.png"
                            alt="404 Icon"
                            width={100}
                            height={100}
                            className="drop-shadow-lg w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
                            priority
                        />
                    </motion.div>
                </div>
                <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-headline"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                >
                    Oops! Page Not Found
                </motion.p>
                <motion.p
                    className="text-sm sm:text-base md:text-lg text-text-paragraph leading-relaxed"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                >
                    Looks like you&#39;re lost. Let&#39;s get you back on track.
                </motion.p>
                <motion.div
                    className="flex justify-center w-full"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.7}}
                >
                    <Button
                        label="Back to Home"
                        onClick={() => router.push("/")}
                        icon={<FaArrowLeft size={18}/>}
                        iconPosition="left"
                        fullWidth
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Custom404;
