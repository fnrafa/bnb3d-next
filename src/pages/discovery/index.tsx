import React from "react";
import Layout from "@/components/layout/Layout";
import DiscoveryComponent from "@/components/discovery/DiscoveryComponent";

const DiscoveryPage: React.FC = () => {
    return (
        <Layout>
            <div className="my-8 mx-4"><DiscoveryComponent/></div>
        </Layout>
    );
};

export default DiscoveryPage;
