import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useAlert} from "@/context/Alert";
import {getToken} from "@/utils/user";
import {MeshData} from "@/types/mesh";
import MeshCard from "@/components/mesh/MeshCard";
import Pagination from "@/components/common/Pagination";
import {useRouter} from "next/router";
import {AiOutlineArrowLeft} from "react-icons/ai";
import Loader from "@/components/common/Loader";

const MeshAssets: React.FC = () => {
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const alert = useAlert();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const itemsPerPage = 12;
    const router = useRouter();

    const fetchUserMeshes = useCallback(async () => {
        if (hasFetched) return;
        setHasFetched(true);
        try {
            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/model/user`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setMeshList(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch mesh data.", "error");
        } finally {
            setIsLoading(false);
        }
    }, [alert, API_BASE_URL, hasFetched]);

    useEffect(() => {
        fetchUserMeshes().then();
    }, [fetchUserMeshes]);

    const sortedMeshList = [...meshList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeshes = sortedMeshList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMeshList.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-white">No mesh assets found</h2>
                <p className="text-secondary-400 mt-2">Start generating 3D models now!</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white bg-primary-700 hover:bg-highlight transition p-3 rounded-lg w-fit self-start"
            >
                <AiOutlineArrowLeft className="w-5 h-5"/>
                Back
            </button>

            <h2 className="text-3xl font-bold text-center text-white">My Mesh Assets</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentMeshes.map((mesh) => (
                    <MeshCard key={mesh.id} mesh={mesh}/>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMeshList.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default MeshAssets;
