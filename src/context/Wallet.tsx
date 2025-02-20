import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {connectWallet as connect, disconnectWallet as disconnect} from "@/utils/wallet";
import {saveUser, clearUser, getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";

interface WalletContextType {
    connectedWallet: string | null;
    walletAddress: string | null;
    isConnecting: boolean;
    connectWallet: (walletName: string) => Promise<void>;
    disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const alert = useAlert();
    const loader = useLoader();

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            setConnectedWallet(storedUser.walletType);
            setWalletAddress(storedUser.address);
        }
    }, []);

    const connectWallet = async (walletName: string) => {
        setIsConnecting(true);
        loader(true, {size: "large"});

        try {
            const result = await connect(walletName);

            if (!result.success) {
                alert(result.error || "Failed to connect wallet", "error");
                return;
            }

            saveUser({
                id: result.user!.id,
                username: result.user!.username,
                address: result.user!.address,
                point: result.user!.point,
                token: result.token!,
                walletType: walletName,
            });

            setConnectedWallet(walletName);
            setWalletAddress(result.user!.address);

            alert(`Connected to ${walletName}: ${result.user!.username}`, "success");
        } catch (error: any) {
            alert(error.message || "Failed to authenticate with the server.", "error");
        } finally {
            setIsConnecting(false);
            loader(false);
        }
    };

    const disconnectWallet = async () => {
        loader(true, {size: "large"});
        await disconnect();
        clearUser();
        setConnectedWallet(null);
        setWalletAddress(null);
        loader(false);
        alert("Wallet disconnected", "info");
    };

    return (
        <WalletContext.Provider value={{connectedWallet, walletAddress, isConnecting, connectWallet, disconnectWallet}}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
