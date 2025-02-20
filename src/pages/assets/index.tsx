import React, {useEffect, useState} from "react";
import {getUser} from "@/utils/user";
import ProtectedPage from "@/components/ProtectedPage";
import {UserData} from "@/utils/user";
import MeshAssets from "@/components/mesh/MeshAssets";
import Layout from "@/components/layout/Layout";

const MeshAssetsPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    return (
        <Layout>
            {user ? <div className="my-8 mx-4"><MeshAssets/></div> : <ProtectedPage/>}
        </Layout>
    );
};

export default MeshAssetsPage;
