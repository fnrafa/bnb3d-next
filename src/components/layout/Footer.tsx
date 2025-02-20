import React from "react";
import {FaTelegram, FaDiscord, FaGithub} from "react-icons/fa";
import {FaEthereum, FaXTwitter} from "react-icons/fa6";

const socialLinks = [
    {href: "#", icon: <FaTelegram size={20}/>, label: "Telegram"},
    {href: "#", icon: <FaXTwitter size={20}/>, label: "X (Twitter)"},
    {href: "#", icon: <FaEthereum size={20}/>, label: "Ethereum"},
    {href: "#", icon: <FaDiscord size={20}/>, label: "Discord"},
    {href: "#", icon: <FaGithub size={20}/>, label: "GitHub"},
];


const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-background text-secondary py-10 border-t border-secondary">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between gap-10">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-extrabold text-text-headline">
                        <span className="text-highlight">BNB3D</span> AI
                    </h2>
                    <p className="text-sm text-text-paragraph mt-2 max-w-xs">
                        The future of AI-powered creativity & Web3 innovation.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.href}
                               className="text-secondary hover:text-highlight transition">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-text-paragraph">
                © 2025 BNB3D AI. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
