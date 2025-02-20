import React, {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/common/Button";
import {useWallet} from "@/context/Wallet";
import {getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import LoggedInComponent from "@/components/common/LoggedIn";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const wallets = [
    {
        name: "MetaMask",
        icon: "/wallets/metamask.png",
        description: "MetaMask is a secure wallet for Ethereum-based assets.",
    },
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({isOpen, onClose}) => {
    const {connectWallet, disconnectWallet, connectedWallet} = useWallet();
    const alert = useAlert();
    const loader = useLoader();
    const user = getUser();
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

    useEffect(() => {
        if (wallets.length === 1) {
            setSelectedWallet(wallets[0].name);
        }
    }, []);

    if (!isOpen) return null;

    const handleConnect = async () => {
        if (!selectedWallet) {
            alert("Please select a wallet.", "error");
            return;
        }

        await connectWallet(selectedWallet);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="bg-background shadow-2xl rounded-lg w-full max-w-md mx-4 p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-secondary-500 hover:text-white">
                    <FaTimes size={24}/>
                </button>
                {connectedWallet ? (
                    <LoggedInComponent user={user} disconnectWallet={disconnectWallet} alert={alert} loader={loader}/>
                ) : (
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-xl font-bold text-white text-center">Connect Your Wallet</h3>
                        <div className="flex flex-col space-y-3">
                            {wallets.map((wallet) => (
                                <button key={wallet.name} onClick={() => setSelectedWallet(wallet.name)}
                                        className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${selectedWallet === wallet.name ? "bg-primary-700 border-accent-500" : "hover:bg-primary-700 border-secondary-700"}`}>
                                    <Image src={wallet.icon} alt={wallet.name} width={40} height={40}/>
                                    <span className="ml-4 text-white">{wallet.name}</span>
                                </button>
                            ))}
                        </div>
                        <Button label="Connect" onClick={handleConnect} fullWidth/>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default WalletConnectModal;
