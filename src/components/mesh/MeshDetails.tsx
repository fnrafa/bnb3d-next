import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {AiFillHeart, AiOutlineHeart, AiOutlineShareAlt} from "react-icons/ai";
import {FaDownload} from "react-icons/fa";
import MeshCard from "@/components/mesh/MeshCard";
import {useAlert} from "@/context/Alert";

type MeshDetailsProps = {
    title: string;
    taskId: string;
    userId?: string;
    username?: string;
    createdAt?: string;
    modelLinks: { type: string; model?: string }[];
};

const MeshDetails: React.FC<MeshDetailsProps> = ({title, taskId, userId, username, createdAt, modelLinks}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [userMeshes, setUserMeshes] = useState<any[]>([]);
    const hasFetched = useRef(false);
    const alert = useAlert();
    const shareLink = `${window.location.origin}/3d/${taskId}`;

    useEffect(() => {
        if (!userId || hasFetched.current) return;
        hasFetched.current = true;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mesh/user/${userId}`)
            .then((response) => setUserMeshes(response.data.data))
            .catch(() => {
            });
    }, [userId]);

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Link copied to clipboard!", "success");
        });
    };

    return (
        <div className="w-full mt-6 p-6 bg-primary-900 rounded-lg shadow-lg space-y-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">{title || "Untitled Model"}</h2>
                    {username && createdAt && (
                        <p className="text-sm text-gray-400 mt-1">
                            Created by: <span className="font-medium">{username}</span> on {createdAt}
                        </p>
                    )}
                </div>
                <div className="flex flex-row gap-3">
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-red-500 transition"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? <AiFillHeart className="w-6 h-6 text-white"/> :
                            <AiOutlineHeart className="w-6 h-6 text-white"/>}
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-blue-500 transition"
                        onClick={handleShare}
                    >
                        <AiOutlineShareAlt className="w-6 h-6 text-white"/>
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Download 3D Model</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {modelLinks.map(({type, model}) => (
                        <div key={type}
                             className="flex items-center justify-between bg-primary-700 p-3 rounded-md shadow-md">
                            <p className="font-medium">{type}</p>
                            {model && (
                                <a href={model} target="_blank" rel="noopener noreferrer">
                                    <button
                                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center">
                                        <FaDownload className="w-4 h-4 mr-1"/> Download
                                    </button>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {userMeshes.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Other Models by {username}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {userMeshes.map((mesh) => (
                            <MeshCard key={mesh.id} mesh={mesh}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeshDetails;
