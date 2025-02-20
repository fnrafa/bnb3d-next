import React, {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/common/Button";
import InputField from "@/components/input/InputField";
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
        description:
            "MetaMask is a secure and widely used cryptocurrency wallet designed for interacting with the Ethereum blockchain and compatible networks.",
    },
    {
        name: "BNB3D AI",
        icon: "/icon.png",
        description: "BNB3D AI allows login using address & password.",
    },
];

const AuthModal: React.FC<WalletConnectModalProps> = ({isOpen, onClose}) => {
    const {connectWallet, disconnectWallet, connectedWallet, loginBNB, registerBNB} = useWallet();
    const alert = useAlert();
    const loader = useLoader();
    const user = getUser();
    const [selectedWallet, setSelectedWallet] = useState<string | null>(wallets[0].name);
    const [activeBNB, setActiveBNB] = useState<"none" | "login" | "register">("none");
    const [loginAddress, setLoginAddress] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerAddress, setRegisterAddress] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    useEffect(() => {
        if (wallets.length === 1) {
            setSelectedWallet(wallets[0].name);
        }
    }, []);

    if (!isOpen) return null;

    const handleWalletConnect = async () => {
        if (!selectedWallet) {
            alert("Please select a wallet.", "error");
            return;
        }

        if (selectedWallet === "BNB3D AI") {
            setActiveBNB("login");
            return;
        }

        await connectWallet(selectedWallet);
        onClose();
    };

    const handleBNBLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginBNB(loginAddress, loginPassword);
    };

    const handleBNBRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerBNB(registerAddress, registerUsername, registerPassword);
    };

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div
                className="bg-background shadow-2xl rounded-lg w-fit max-w-4xl mx-4 p-6 relative border border-highlight">
                <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-white">
                    <FaTimes size={24}/>
                </button>

                {connectedWallet || user ? (
                    <LoggedInComponent user={user} disconnectWallet={disconnectWallet} alert={alert} loader={loader}/>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 md:border-r border-highlight md:pr-4">
                            <h3 className="text-xl font-bold text-text-headline text-center mb-4">
                                Select Authentication
                            </h3>
                            <div className="flex flex-col space-y-3">
                                {wallets.map((wallet) => (
                                    <button
                                        key={wallet.name}
                                        onClick={() => {
                                            setSelectedWallet(wallet.name);
                                            if (wallet.name === "BNB3D AI") setActiveBNB("login");
                                            else setActiveBNB("none");
                                        }}
                                        className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${
                                            selectedWallet === wallet.name
                                                ? "bg-highlight border-highlight"
                                                : "hover:bg-primary-700 border-secondary"
                                        }`}
                                    >
                                        <Image src={wallet.icon} alt={wallet.name} width={40} height={40}/>
                                        <span className="ml-4 text-white">{wallet.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-2/3 md:pl-4 pt-8 md:pt-0 flex flex-col items-center min-h-[320px] max-w-md flex-grow">
                            <div className="flex items-center justify-center mb-4">
                                <Image
                                    src={wallets.find((w) => w.name === selectedWallet)?.icon || "/icon.png"}
                                    alt={selectedWallet || "wallet"}
                                    width={50}
                                    height={50}
                                />
                                <h1 className="text-2xl text-white ml-2">{selectedWallet}</h1>
                            </div>
                            <p className="text-text-paragraph text-left mb-4">
                                {wallets.find((w) => w.name === selectedWallet)?.description}
                            </p>

                            {selectedWallet === "BNB3D AI" ? (
                                <div className="w-full flex-grow flex flex-col justify-center">
                                    {activeBNB === "none" ? (
                                        <div className="flex flex-col space-y-4 w-full">
                                            <Button label="Login with BNB3D AI" onClick={() => setActiveBNB("login")}
                                                    fullWidth/>
                                            <Button label="Register with BNB3D AI"
                                                    onClick={() => setActiveBNB("register")} fullWidth/>
                                        </div>
                                    ) : activeBNB === "login" ? (
                                        <form onSubmit={handleBNBLogin} className="space-y-4 w-full">
                                            <InputField name="loginAddress" value={loginAddress}
                                                        onChange={setLoginAddress} placeholder="Enter your address"
                                                        required/>
                                            <InputField name="loginPassword" type="password" value={loginPassword}
                                                        onChange={setLoginPassword} placeholder="Enter your password"
                                                        required/>
                                            <Button label="Login" type="submit" fullWidth/>
                                            <div className="mt-2 text-center">
                                                <Button label="Don't have an account? Register"
                                                        onClick={() => setActiveBNB("register")}/>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleBNBRegister} className="space-y-4 w-full">
                                            <InputField name="registerAddress" value={registerAddress}
                                                        onChange={setRegisterAddress} placeholder="Enter your address"
                                                        required/>
                                            <InputField name="registerUsername" value={registerUsername}
                                                        onChange={setRegisterUsername}
                                                        placeholder="Enter your username (optional)"/>
                                            <InputField name="registerPassword" type="password" value={registerPassword}
                                                        onChange={setRegisterPassword} placeholder="Enter your password"
                                                        required/>
                                            <Button label="Register" type="submit" fullWidth/>
                                            <div className="mt-2 text-center">
                                                <Button label="Already have an account? Login"
                                                        onClick={() => setActiveBNB("login")}/>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ) : (
                                <Button label="Connect" onClick={handleWalletConnect} fullWidth/>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;
