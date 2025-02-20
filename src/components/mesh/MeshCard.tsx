import React, { useState } from "react";
import Image from "next/image";
import { MeshData } from "@/types/mesh";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useAlert } from "@/context/Alert";
import { motion, AnimatePresence } from "framer-motion";

interface MeshCardProps {
    mesh: MeshData;
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const MeshCard: React.FC<MeshCardProps> = ({ mesh }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [animating, setAnimating] = useState(false);
    const alert = useAlert();

    const imageUrl = mesh.Image;
    const meshId = mesh.id;
    const createdAt = new Date(mesh.createdAt);
    const createdAtFormatted = createdAt.toLocaleDateString();
    const shareLink = `${window.location.origin}/generate/${meshId}`;

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Link copied to clipboard!", "success");
        });
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnimating(true);
        setIsFavorite((prev) => !prev);
        setTimeout(() => setAnimating(false), 1000);
    };

    return (
        <div
            className="relative cursor-pointer bg-gray-900 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl group"
            onClick={() => (window.location.href = `/generate/${meshId}`)}
        >
            <div className="relative w-full h-40 flex items-center justify-center bg-primary-700">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={mesh.prompt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "contain" }}
                        priority
                        className="rounded-t-lg"
                    />
                ) : (
                    <span className="text-secondary-400 text-sm">Preview Not Ready</span>
                )}

                <div className="absolute top-2 right-2 flex gap-2 rounded-lg backdrop-blur-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition relative overflow-hidden"
                        onClick={handleFavorite}
                    >
                        {isFavorite ? (
                            <AiFillHeart className="w-5 h-5 text-red-500" />
                        ) : (
                            <AiOutlineHeart className="w-5 h-5 text-white" />
                        )}

                        <AnimatePresence>
                            {animating && (
                                <motion.div
                                    initial={{ y: 0, opacity: 0 }}
                                    animate={{ y: -50, opacity: 1, scale: 1.2 }}
                                    exit={{ y: -50, opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-red-500 text-xl z-50"
                                >
                                    {isFavorite ? "❤️" : "💔"}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition"
                        onClick={handleShare}
                    >
                        <AiOutlineShareAlt className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-2 bg-highlight">
                <h3 className="text-lg font-bold text-white">{truncateText(mesh.prompt, 24)}</h3>
                <div className="flex justify-between items-center text-secondary-500 text-xs">
                    <span className="text-secondary-400">{mesh.user?.username || "Unknown"}</span>
                    <span className="text-secondary-400">{createdAtFormatted}</span>
                </div>
            </div>
        </div>
    );
};

export default MeshCard;
