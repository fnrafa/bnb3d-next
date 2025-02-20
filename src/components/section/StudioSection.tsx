import React from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {FaRocket} from "react-icons/fa";

const StudioSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="studio"
            className="relative flex flex-col lg:grid lg:grid-cols-2 items-center text-white min-h-screen px-6 sm:px-12 lg:px-24 py-16 lg:py-24 bg-background max-w-screen-2xl mx-auto"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 1}}
        >
            <div className="relative flex flex-col gap-6 text-center lg:text-left items-center lg:items-start w-full">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-headline leading-tight"
                    initial={{y: -50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8}}
                >
                    Unleash <span className="text-highlight">3D Creativity</span>
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-paragraph leading-relaxed max-w-lg sm:max-w-xl lg:max-w-2xl"
                    initial={{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.2}}
                >
                    Connect your wallet and generate <span
                    className="text-highlight font-bold">unlimited 3D assets</span> instantly.
                </motion.p>

                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.4}}
                >
                    <Button
                        label="Start Generating"
                        onClick={() => router.push("/generate")}
                        icon={<FaRocket/>}
                        iconPosition="right"
                        fullWidth={true}
                    />
                </motion.div>
            </div>

            <motion.div
                className="flex justify-center items-center mt-12 lg:mt-0 w-full"
                initial={{opacity: 0, x: 100}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: false}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <Image
                    src="/images/creativity.webp"
                    alt="3D Creativity"
                    width={800}
                    height={600}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto"
                    priority
                />
            </motion.div>
        </motion.section>
    );
};

export default StudioSection;
