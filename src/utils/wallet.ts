import {BrowserProvider} from "ethers";
import axios from "axios";
import {getToken} from "@/utils/user";

interface WalletResponse {
    success: boolean;
    address?: string;
    walletName?: string;
    error?: string;
    token?: string;
    user?: {
        id: string;
        username: string;
        address: string;
        point: number;
    };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const connectWallet = async (walletName: string): Promise<WalletResponse> => {
    try {
        let provider: BrowserProvider | null = null;
        const ethereumObj = (window as any)["ethereum"];

        if (!ethereumObj) {
            return {success: false, error: "No Ethereum provider found. Please install a wallet extension."};
        }

        if (walletName === "MetaMask" && ethereumObj["isMetaMask"]) {
            await ethereumObj.request({method: "eth_requestAccounts"});
            provider = new BrowserProvider(ethereumObj);
        } else {
            return {success: false, error: `${walletName} is not supported or not installed.`};
        }

        if (!provider) {
            return {success: false, error: "No provider found."};
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const nonceResponse = await axios.post(`${API_BASE_URL}/auth/nonce`, {address});
        if (!nonceResponse) {
            return {success: false, error: "Failed to retrieve nonce."};
        }

        const nonce = nonceResponse.data.data.nonce;

        const signature = await signer.signMessage(nonce);

        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {address, signature});

        if (!loginResponse) {
            return {success: false, error: "Failed to authenticate."};
        }

        const {token, id, username, point} = loginResponse.data.data;

        localStorage.setItem("walletAddress", address);
        localStorage.setItem("connectedWallet", walletName);
        localStorage.setItem("authToken", token);

        return {
            success: true,
            address,
            walletName,
            token,
            user: {id, username, address, point},
        };
    } catch (error: any) {
        return {success: false, error: error.message || "An unknown error occurred."};
    }
};

export const disconnectWallet = async (): Promise<void> => {
    try {
        const token = getToken();
        if (token) {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            });
        }

        localStorage.removeItem("walletAddress");
        localStorage.removeItem("connectedWallet");
        localStorage.removeItem("authToken");
    } catch (error: any) {
        console.error("Error disconnecting wallet:", error.message || "An unknown error occurred.");
    }
};
