import React, {useState, useEffect} from "react";
import axios from "axios";
import {io, Socket} from "socket.io-client";
import {useAlert} from "@/context/Alert";
import {useRouter} from "next/router";
import {getToken} from "@/utils/user";
import {FaRegPaperPlane, FaSpinner, FaClock, FaCheckCircle, FaInfoCircle} from "react-icons/fa";
import Button from "@/components/common/Button";
import InputField from "@/components/input/InputField";
import {MeshData} from "@/types/mesh";

const ThreeDGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [task, setTask] = useState<MeshData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string>("Waiting...");
    const [message, setMessage] = useState<string>("");

    const alert = useAlert();
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "";
    const SOCKET_URL = SOCKET_BASE_URL.startsWith("https")
        ? SOCKET_BASE_URL.replace("https", "wss")
        : SOCKET_BASE_URL.replace("http", "ws");

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    const handleGenerateMesh = async () => {
        try {
            setIsLoading(true);
            setStatus("Processing...");
            setMessage("Initializing model generation...");

            const token = getToken();
            if (!token) {
                alert("You need to login to generate 3D content. Please log in.", "error");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/model/generate`,
                {prompt},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            const taskData = response.data.data;
            setTask(taskData);
            setStatus("Waiting...");
            setMessage("Your request has been received. Please wait...");

            const newSocket = io(SOCKET_URL, {
                auth: {token}
            });
            setSocket(newSocket);

            newSocket.on(taskData.id, (data: { status: string; message: string }) => {
                setStatus(data.status);
                setMessage(data.message);

                if (data.status === "done" || data.status === "SUCCEEDED") {
                    newSocket.disconnect();
                    setSocket(null);
                }
            });
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to generate 3D content.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-highlight">
            <div
                className="bg-gray-800 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-3xl px-8 py-10 text-white">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-white">
                    3D Model Generator
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Generate stunning 3D models instantly. Enter your prompt and let AI do the magic.
                </p>

                {task ? (
                    <div
                        className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-lg w-full transition-all duration-300">
                        {status === "Processing..." || status === "processing" && (
                            <>
                                <FaSpinner className="text-blue-400 text-5xl animate-spin"/>
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mt-4">
                                    Processing...
                                </h3>
                            </>
                        )}
                        {status === "Waiting..." || status === "waiting" && (
                            <>
                                <FaClock className="text-yellow-400 text-5xl"/>
                                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mt-4">
                                    Waiting...
                                </h3>
                            </>
                        )}
                        {status === "Error" || status === "error" && (
                            <>
                                <FaInfoCircle className="text-red-400 text-5xl"/>
                                <h3 className="text-lg sm:text-xl font-semibold text-red-400 mt-4">
                                    Error...
                                </h3>
                            </>
                        )}
                        {(status === "done" || status === "SUCCEEDED") && (
                            <>
                                <FaCheckCircle className="text-green-400 text-5xl"/>
                                <h3 className="text-lg sm:text-xl font-semibold text-green-400 mt-4">
                                    Done!
                                </h3>
                                <Button
                                    label="Check Result"
                                    onClick={() => router.push(`/generate/${task?.id}`)}
                                    fullWidth
                                />
                            </>
                        )}
                        <p className="text-sm sm:text-base text-gray-400 text-center mt-2">
                            {message}
                        </p>
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
                            onClick={handleGenerateMesh}
                            icon={<FaRegPaperPlane/>}
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
