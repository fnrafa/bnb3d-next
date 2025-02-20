import React from "react";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";

interface DiscoverySearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    handleSearch: () => void;
}

const DiscoverySearchBar: React.FC<DiscoverySearchBarProps> = ({searchQuery, setSearchQuery, handleSearch}) => {
    return (
        <div className="relative mb-8 flex flex-col items-center space-y-4">
            <div className="flex flex-row items-center gap-4 w-full">
                <div className="flex-1">
                    <InputField name="search" value={searchQuery} onChange={setSearchQuery}
                                placeholder="Search model / user..."/>
                </div>
                <Button label="Search" onClick={handleSearch}/>
            </div>
        </div>
    );
};

export default DiscoverySearchBar;
