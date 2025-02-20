import React, {useState} from "react";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import Button from "@/components/common/Button";
import {motion} from "framer-motion";
import {FaWallet} from "react-icons/fa";
import Image from "next/image";

const ProtectedPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-6 sm:px-10 lg:px-24">
            <motion.div
                className="text-center space-y-6 p-6 sm:p-8 md:p-10 lg:p-12 max-w-sm sm:max-w-md md:max-w-lg w-full bg-primary/70 backdrop-blur-md shadow-lg rounded-xl border border-secondary"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <motion.div
                    className="flex justify-center items-center p-3 sm:p-4"
                    initial={{scale: 0.9}}
                    animate={{scale: 1}}
                    transition={{duration: 0.6, repeat: Infinity, repeatType: "reverse"}}
                >
                    <Image
                        src="/wallets/metamask.png"
                        alt="Wallet Icon"
                        width={100}
                        height={100}
                        className="drop-shadow-lg w-16 sm:w-20 md:w-24 lg:w-28 h-auto"
                        priority
                    />
                </motion.div>
                <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-headline"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                >
                    Connect Required
                </motion.p>
                <motion.p
                    className="text-sm sm:text-base md:text-lg text-text-paragraph leading-relaxed"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                >
                    Please connect your wallet to access this feature.
                </motion.p>
                <motion.div
                    className="flex justify-center w-full"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.7}}
                >
                    <Button
                        label="Connect Wallet"
                        onClick={() => setIsModalOpen(true)}
                        icon={<FaWallet size={18}/>}
                        iconPosition="left"
                        fullWidth
                    />
                </motion.div>
            </motion.div>
            <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    );
};

export default ProtectedPage;
