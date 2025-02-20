import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaRegPaperPlane, FaSpinner, FaClock, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import Button from "@/components/common/Button";
import InputField from "@/components/input/InputField";
import { useGeneration } from "@/context/Generation";

const ThreeDGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const router = useRouter();
    const { task, status, message, isLoading, startGeneration, retryGeneration } = useGeneration();

    const handleGenerate = async () => {
        await startGeneration(prompt);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-highlight">
            <div className="bg-gray-800 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-3xl px-8 py-10 text-white">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-white">3D Model Generator</h2>
                <p className="text-center text-gray-300 mb-6">
                    Generate stunning 3D models instantly. Enter your prompt and let AI do the magic.
                </p>
                {task ? (
                    <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-lg w-full transition-all duration-300">
                        {(status.toLowerCase() === "processing" || status === "Processing...") && (
                            <>
                                <FaSpinner className="text-blue-400 text-5xl animate-spin" />
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mt-4">Processing...</h3>
                            </>
                        )}
                        {(status.toLowerCase() === "waiting" || status === "Waiting...") && (
                            <>
                                <FaClock className="text-yellow-400 text-5xl" />
                                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mt-4">Waiting...</h3>
                            </>
                        )}
                        {status.toLowerCase() === "error" && (
                            <>
                                <FaInfoCircle className="text-red-400 text-5xl" />
                                <h3 className="text-lg sm:text-xl font-semibold text-red-400 mt-4">Error...</h3>
                                <Button label="Retry" onClick={retryGeneration} fullWidth />
                            </>
                        )}
                        {(status.toLowerCase() === "done" || status.toLowerCase() === "succeeded") && (
                            <>
                                <FaCheckCircle className="text-green-400 text-5xl" />
                                <h3 className="text-lg sm:text-xl font-semibold text-green-400 mt-4">Done!</h3>
                                <Button label="Check Result" onClick={() => router.push(`/generate/${task?.id}`)} fullWidth />
                            </>
                        )}
                        <p className="text-sm sm:text-base text-gray-400 text-center mt-2">{message}</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <InputField
                            name="prompt"
                            value={prompt}
                            onChange={(value) => setPrompt(value)}
                            placeholder="Describe the 3D model you want..."
                            disabled={isLoading}
                        />
                        <Button
                            label="Generate"
                            onClick={handleGenerate}
                            icon={<FaRegPaperPlane />}
                            disabled={isLoading || prompt.trim() === ""}
                            fullWidth
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreeDGeneration;
