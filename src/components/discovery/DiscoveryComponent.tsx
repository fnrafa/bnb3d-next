import React, { useEffect, useState, useRef } from "react";
import DiscoverySearchBar from "@/components/discovery/DiscoverySearchBar";
import Pagination from "@/components/common/Pagination";
import MeshCard from "@/components/mesh/MeshCard";
import { useAlert } from "@/context/Alert";
import { MeshData } from "@/types/mesh";
import Loader from "@/components/common/Loader";

const DiscoveryComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [filteredMeshList, setFilteredMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const alert = useAlert();
    const fetchedMesh = useRef(false);

    useEffect(() => {
        if (fetchedMesh.current) return;
        fetchedMesh.current = true;

        const fetchMeshData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/model`);
                if (!response.ok) alert("Failed to fetch 3D models");

                const data = await response.json();
                setMeshList(data.data || []);
                setFilteredMeshList(data.data || []);
            } catch {
                alert("An error occurred while fetching 3D models.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeshData().then();
    }, [API_BASE_URL, alert]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredMeshList]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        setFilteredMeshList(meshList.filter((mesh) => mesh.prompt?.toLowerCase().includes(query)));
    };

    const paginatedData = filteredMeshList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large" />
            </div>
        );
    }

    if (!filteredMeshList.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-white">No mesh assets found</h2>
                <p className="text-secondary-400 mt-2">Start exploring 3D models now!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full text-white flex flex-col justify-between items-center">
            <div className="w-full">
                <DiscoverySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedData.map((mesh) => (
                        <MeshCard key={mesh.id} mesh={mesh} />
                    ))}
                </div>
            </div>

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredMeshList.length} itemsPerPage={itemsPerPage} />
        </div>
    );
};

export default DiscoveryComponent;
