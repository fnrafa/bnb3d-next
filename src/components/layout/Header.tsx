import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {FaWallet, FaBars, FaTimes} from "react-icons/fa";
import AuthModal from "@/components/common/AuthModal";
import Button from "@/components/common/Button";
import {useWallet} from "@/context/Wallet";
import Link from "next/link";

const Header: React.FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const {connectedWallet, isConnecting} = useWallet();

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? "hidden" : "";
    }, [isNavOpen]);

    const navItems = [
        {label: "Home", path: "/"},
        {label: "Discovery", path: "/discovery"},
        {label: "Generate", path: "/generate"},
        {label: "Assets", path: "/assets"},
    ];

    const handleNavigation = (path: string) => {
        setIsNavOpen(false);
        router.push(path).then();
    };

    return (
        <header className="fixed top-0 left-0 w-full z-30 bg-background shadow-lg transition-all duration-300">
            <nav className="px-4 lg:px-10 py-3">
                <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
                    <button onClick={() => router.push("/")} className="flex items-center gap-2">
                        <div className="relative w-10 md:w-12 h-10 md:h-12">
                            <Image
                                src="/icon.png"
                                alt="BNB3D AI Logo"
                                fill
                                sizes="(max-width: 768px) 40px, (max-width: 1200px) 48px, 56px"
                                style={{objectFit: "contain"}}
                                priority
                            />
                        </div>
                        <p className="text-text-headline ps-2 font-bold text-lg md:text-xl">
                            <span className="text-highlight">BNB3D</span> AI
                        </p>
                    </button>
                    <ul className="hidden lg:flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.path}
                                    className="text-text-headline font-bold hover:text-highlight transition-colors"
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="absolute right-4 lg:hidden flex items-center space-x-4">
                        <button onClick={() => setIsModalOpen(true)} className="text-highlight">
                            <FaWallet size={24}/>
                        </button>
                        <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-text-headline">
                            {isNavOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <Button
                            label={isConnecting ? "Connecting..." : connectedWallet ? `${connectedWallet}` : "Connect Wallet"}
                            onClick={() => setIsModalOpen(true)}
                            icon={<FaWallet size={18}/>}
                        />
                    </div>
                </div>
            </nav>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background z-60 transform transition-transform duration-300 ${
                    isNavOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                <ul className="flex flex-col h-full p-6 space-y-6">
                    <li className="self-end">
                        <button onClick={() => setIsNavOpen(false)}
                                className="text-text-headline hover:text-highlight transition-colors">
                            <FaTimes size={24}/>
                        </button>
                    </li>

                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.path}
                                className="w-full text-left text-text-headline hover:text-highlight transition-colors text-lg"
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    <li className="mt-auto">
                        <Button
                            label={isConnecting ? "Connecting..." : connectedWallet ? `${connectedWallet}` : "Connect Wallet"}
                            onClick={() => {
                                setIsNavOpen(false);
                                setIsModalOpen(true);
                            }}
                            icon={<FaWallet size={18}/>}
                            fullWidth
                        />
                    </li>
                </ul>
            </div>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </header>
    );
};

export default Header;
