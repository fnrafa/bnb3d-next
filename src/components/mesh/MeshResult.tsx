import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Loader from "@/components/common/Loader";
import MeshViewer from "@/components/mesh/MeshViewer";
import MeshDetails from "@/components/mesh/MeshDetails";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {MeshData} from "@/types/mesh";

const MeshResult: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [mesh, setMesh] = useState<MeshData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id || typeof id !== "string") return;
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/model/result/${id}`)
            .then((response) => setMesh(response.data.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <Loader size="large"/>
            </div>
        );
    }

    if (error || !mesh) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-4">
                <p className="text-lg font-semibold">Data not found</p>
            </div>
        );
    }

    const modelLinks = [
        {type: "GLB", model: mesh.modelGlb},
        {type: "FBX", model: mesh.modelFbx},
        {type: "OBJ", model: mesh.modelUsdz},
    ].filter((link) => link.model);

    return (
        <div className="w-full flex flex-col items-center pt-4">
            <div className="w-full flex justify-start px-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white bg-primary-800 transition p-3 rounded-lg hover:bg-primary-700"
                >
                    <AiOutlineArrowLeft className="w-5 h-5"/>
                    Back
                </button>
            </div>

            <div
                className="relative w-full aspect-video bg-primary-800 rounded-lg overflow-hidden shadow-xl max-h-[70vh] mt-4">
                <MeshViewer modelUrl={mesh.modelGlb}/>
            </div>

            <MeshDetails
                title={mesh.prompt}
                userId={mesh.user?.id}
                username={mesh.user?.username}
                createdAt={new Date(mesh.createdAt).toLocaleDateString()}
                modelLinks={modelLinks}
                taskId={mesh.taskId}
            />
        </div>
    );
};

export default MeshResult;
