import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {connectWallet as connect, disconnectWallet as disconnect} from "@/utils/wallet";
import {saveUser, clearUser, getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import {useRouter} from "next/router";
import axios from "axios";

interface WalletContextType {
    connectedWallet: string | null;
    walletAddress: string | null;
    isConnecting: boolean;
    connectWallet: (walletName: string) => Promise<void>;
    disconnectWallet: () => void;
    loginBNB: (address: string, password: string) => Promise<void>;
    registerBNB: (address: string, username: string, password: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const alert = useAlert();
    const router = useRouter();

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            setConnectedWallet(storedUser.walletType);
            setWalletAddress(storedUser.address);
        }
    }, []);

    const connectWallet = async (walletName: string) => {
        setIsConnecting(true);
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
            router.reload();
        } catch (error: any) {
            alert(error.message || "Failed to authenticate with the server.", "error");
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = async () => {
        await disconnect();
        clearUser();
        setConnectedWallet(null);
        setWalletAddress(null);
        alert("Wallet disconnected", "info");
        router.reload();
    };

    const loginBNB = async (address: string, password: string) => {
        setIsConnecting(true);
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const res = await axios.post(`${API_BASE_URL}/auth/login/bnb`, {address, password});
            const {token, id, username, point, address: userAddress} = res.data.data;
            saveUser({
                id,
                username,
                address: userAddress,
                point,
                token,
                walletType: "BNB3D",
            });
            setConnectedWallet("BNB3D");
            setWalletAddress(userAddress);
            alert(`Logged in as ${username}`, "success");
            router.reload();
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed", "error");
        } finally {
            setIsConnecting(false);
        }
    };

    const registerBNB = async (address: string, username: string, password: string) => {
        setIsConnecting(true);
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const payload: any = { address, password };
            if (username && username.trim() !== "") {
                payload.username = username;
            }
            await axios.post(`${API_BASE_URL}/auth/register`, payload);
            alert("Registration successful", "success");
        } catch (error: any) {
            alert(error.response?.data?.message || "Registration failed", "error");
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                connectedWallet,
                walletAddress,
                isConnecting,
                connectWallet,
                disconnectWallet,
                loginBNB,
                registerBNB,
            }}
        >
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
