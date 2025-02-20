import React from "react";
import {motion} from "framer-motion";
import {FaRegCompass, FaMagic} from "react-icons/fa";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";
import ImageInfiniteSlider from "@/components/common/ImageInfiniteSlider";

const scrollingImages = [
    "/assets/ai/dall-e-alien-creature.webp",
    "/assets/ai/dall-e-cute-alien.webp",
    "/assets/ai/dall-e-cute-dragon.webp",
    "/assets/ai/dall-e-cute-fluffy-creature.webp",
    "/assets/ai/dall-e-drone.webp",
    "/assets/ai/dall-e-fantasy-elf.webp",
    "/assets/ai/dall-e-futuristic-hover-bike.webp",
    "/assets/ai/dall-e-futuristic-humanoid-robot.webp",
    "/assets/ai/dall-e-futuristic-robot-panther.webp",
    "/assets/ai/dall-e-mechanical-insect.webp",
    "/assets/ai/dall-e-medieval-warrior.webp",
];

const ProductionSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="product"
            className="flex relative w-full h-screen overflow-hidden text-white items-center justify-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div className="absolute top-0 left-0 w-full h-1/2 z-0 flex justify-center items-center">
                <ImageInfiniteSlider
                    images={scrollingImages}
                    speed={20}
                    direction="left"
                    imageWidth={300}
                    imageHeight={300}
                    gap={12}
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 flex justify-center items-center">
                <ImageInfiniteSlider
                    images={scrollingImages}
                    speed={20}
                    direction="right"
                    imageWidth={300}
                    imageHeight={300}
                    gap={12}
                />
            </div>

            <div
                className="relative z-10 flex flex-col items-center justify-center w-full min-h-[50vh] text-center bg-primary-900 bg-opacity-90 mx-auto px-6 py-12 md:px-12 lg:px-18">
                <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-white tracking-wide leading-tight">
                    Transform Ideas into Reality with AI-Powered Creativity
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-secondary-800">
                    LogicAI empowers you to transform text into innovative 3D models, music, programs, NFTs, metaverse
                    assets, and games. Unleash your creativity with cutting-edge AI tools designed to explore, create,
                    and innovate effortlessly.
                </p>
                <div className="flex flex-row gap-4 w-full justify-center items-center mt-6">
                    <Button
                        label="Discovery"
                        onClick={() => router.push("/discovery")}
                        icon={<FaRegCompass/>}
                        iconPosition="left"
                        fullWidth={false}
                    />
                    <Button
                        label="Generate"
                        onClick={() => router.push("/feature")}
                        icon={<FaMagic/>}
                        iconPosition="left"
                        fullWidth={false}
                    />
                </div>
            </div>
        </motion.section>
    );
};

export default ProductionSection;
