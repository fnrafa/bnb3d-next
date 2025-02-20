import React, { useEffect, useState, useCallback, useRef } from "react";
import DiscoverySearchBar from "@/components/discovery/DiscoverySearchBar";
import Pagination from "@/components/common/Pagination";
import MeshCard from "@/components/mesh/MeshCard";
import { useLoader } from "@/context/Loader";
import { useAlert } from "@/context/Alert";
import { MeshData } from "@/types/mesh";

const DiscoveryComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [filteredMeshList, setFilteredMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const loader = useLoader();
    const alert = useAlert();
    const fetchedMesh = useRef(false);

    const fetchMeshData = useCallback(async () => {
        if (fetchedMesh.current) return;
        loader(true, { size: "large" });

        try {
            const response = await fetch(`${API_BASE_URL}/model`);
            if (response.ok) {
                const data = await response.json();
                setMeshList(data.data || []);
                setFilteredMeshList(data.data || []);
            } else {
                alert("Failed to fetch 3D models.");
            }
        } catch {
            alert("An error occurred while fetching 3D models.");
        } finally {
            loader(false);
            fetchedMesh.current = true;
        }
    }, [API_BASE_URL, loader, alert]);

    useEffect(() => {
        fetchMeshData().then();
    }, [fetchMeshData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredMeshList]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        setFilteredMeshList(meshList.filter((mesh) => mesh.prompt?.toLowerCase().includes(query)));
    };

    const paginatedData = filteredMeshList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
