import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import generationService, { MeshData } from "@/utils/generate";
import { useAlert } from "@/context/Alert";

interface GenerationContextProps {
    task: MeshData | null;
    status: string;
    message: string;
    isLoading: boolean;
    startGeneration: (prompt: string) => Promise<void>;
    retryGeneration: () => void;
}

const GenerationContext = createContext<GenerationContextProps | undefined>(undefined);

export const GenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [task, setTask] = useState<MeshData | null>(null);
    const [status, setStatus] = useState("Waiting...");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const alert = useAlert();

    const prevStatus = useRef<string>("");

    useEffect(() => {
        generationService.setStatusCallback((newStatus, newMessage) => {
            setStatus(newStatus);
            setMessage(newMessage);

            if (prevStatus.current !== newStatus) {
                if (newStatus.toLowerCase() === "done" || newStatus.toLowerCase() === "succeeded") {
                    alert("3D generation completed successfully!", "success");
                }
                if (newStatus.toLowerCase() === "error") {
                    alert("3D generation encountered an error.", "error");
                }
                prevStatus.current = newStatus;
            }
        });

        const storedTask = localStorage.getItem("DND3D_AI_GENERATION_TASK");
        if (storedTask) {
            const parsedTask = JSON.parse(storedTask);
            setTask(parsedTask);
            generationService.resumeTask();
        }
    }, []);

    const startGeneration = async (prompt: string) => {
        setIsLoading(true);
        setStatus("Processing...");
        setMessage("Initializing model generation...");
        try {
            const newTask = await generationService.startGeneration(prompt);
            if (newTask) {
                setTask(newTask);
            }
        } catch (error: any) {
            alert(error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const retryGeneration = () => {
        generationService.retry();
        setTask(null);
        setStatus("Waiting...");
        setMessage("");
    };

    return (
        <GenerationContext.Provider value={{ task, status, message, isLoading, startGeneration, retryGeneration }}>
            {children}
        </GenerationContext.Provider>
    );
};

export const useGeneration = () => {
    const context = useContext(GenerationContext);
    if (!context) throw new Error("useGeneration must be used within a GenerationProvider");
    return context;
};
