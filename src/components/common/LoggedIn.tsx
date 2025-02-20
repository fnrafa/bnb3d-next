import React, {useState} from "react";
import {FaCopy, FaPencilAlt} from "react-icons/fa";
import Button from "./Button";
import {saveUser, getUser, getToken} from "@/utils/user";
import axios from "axios";
import InputField from "@/components/input/InputField";
import Image from "next/image";

interface LoggedInComponentProps {
    user: ReturnType<typeof getUser>;
    disconnectWallet: () => void;
    alert: (message: string, type: "success" | "error" | "info") => void;
    loader: (state: boolean) => void;
}

const LoggedInComponent: React.FC<LoggedInComponentProps> = ({
                                                                 user,
                                                                 disconnectWallet,
                                                                 alert,
                                                                 loader,
                                                             }) => {
    const [username, setUsername] = useState<string | null>(user?.username || null);
    const [editMode, setEditMode] = useState(false);

    const handleUpdateUsername = async () => {
        if (!username || username.length < 4 || username.length > 20) {
            alert("Username must be between 4 and 20 characters.", "error");
            return;
        }
        loader(true);
        try {
            const token = getToken();
            if (!token) {
                alert("User token not found. Please re-login.", "error");
                return;
            }
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/username`,
                {username},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            saveUser({
                id: user?.id || "unknown",
                username,
                address: user?.address || "",
                point: user?.point || 0,
                token: user?.token || "",
                walletType: user?.walletType || "unknown",
            });
            setEditMode(false);
            alert("Username updated successfully!", "success");
        } catch (error: any) {
            alert(error.message || "Failed to update username.", "error");
        } finally {
            loader(false);
        }
    };

    const handleCopyAddress = () => {
        if (user?.address) {
            navigator.clipboard.writeText(user.address).then();
            alert("Wallet address copied to clipboard!", "success");
        }
    };

    const formattedAddress = user?.address
        ? `${user.address.slice(0, 5)}xxxxxxxxx`
        : "Unknown Address";

    return (
        <div className="space-y-6 relative shadow-lg rounded-lg max-w-md mx-auto">
            <div className="flex justify-center items-center space-x-2">
                <Image src="/icon.png" alt="Logic AI Logo" width={32} height={32} className="sm:w-12 sm:h-12"/>
                <p className="text-white font-bold text-lg sm:text-xl">Profile Account</p>
            </div>
            <div className="text-center space-y-2">
                {editMode ? (
                    <div className="flex flex-col items-center gap-3">
                        <InputField type="text" value={username || ""} onChange={(value) => setUsername(value)}
                                    placeholder="Enter your username" name="username"/>
                        <div className="flex w-full justify-end gap-2">
                            <Button label="Cancel" onClick={() => setEditMode(false)}/>
                            <Button label="Save" onClick={handleUpdateUsername}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between bg-secondary px-4 py-2 rounded-lg">
                        <p className="flex font-bold text-white truncate items-center">{username}</p>
                        <Button icon={<FaPencilAlt/>} onClick={() => setEditMode(true)}/>
                    </div>
                )}
            </div>

            <div className="text-center space-y-2">
                <div className="flex justify-between bg-secondary px-4 py-2 rounded-lg">
                    <p className="flex items-center">{formattedAddress}</p>
                    <Button icon={<FaCopy/>} onClick={handleCopyAddress}/>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button label="Disconnect" onClick={disconnectWallet}/>
            </div>
        </div>
    );
};

export default LoggedInComponent;
