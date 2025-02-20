import axios from "axios";
import { io, Socket } from "socket.io-client";
import { getToken } from "./user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "";
const SOCKET_URL = SOCKET_BASE_URL.startsWith("https")
    ? SOCKET_BASE_URL.replace("https", "wss")
    : SOCKET_BASE_URL.replace("http", "ws");

const TASK_KEY = "DND3D_AI_TASK";

export interface MeshData {
    id: string;
}

export type StatusUpdate = {
    status: string;
    message: string;
};

type CallbackFunction = (status: string, message: string) => void;

class GenerationService {
    private socket: Socket | null = null;
    private task: MeshData | null = null;
    private statusCallback: CallbackFunction | null = null;

    setStatusCallback(callback: CallbackFunction) {
        this.statusCallback = callback;
    }

    async startGeneration(prompt: string): Promise<MeshData | null> {
        const token = getToken();
        if (!token) return null;
        try {
            const response = await axios.post(
                `${API_BASE_URL}/model/generate`,
                { prompt },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const taskData: MeshData = response.data.data;
            this.task = taskData;
            localStorage.setItem(TASK_KEY, JSON.stringify(taskData));
            this.initSocket(taskData.id, token);
            return taskData;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || "Failed to generate 3D content."
            );
        }
    }

    resumeTask() {
        const storedTask = localStorage.getItem(TASK_KEY);
        if (storedTask) {
            const taskData: MeshData = JSON.parse(storedTask);
            const token = getToken();
            if (token) {
                this.task = taskData;
                this.initSocket(taskData.id, token);
            }
        }
    }

    private initSocket(taskId: string, token: string): void {
        this.socket = io(SOCKET_URL, { auth: { token } });
        this.socket.on(taskId, (data: StatusUpdate) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.statusCallback && this.statusCallback(data.status, data.message);
            if (
                data.status.toLowerCase() === "done" ||
                data.status.toLowerCase() === "succeeded"
            ) {
                this.cleanup();
            }
        });
    }

    cleanup(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.task = null;
        localStorage.removeItem(TASK_KEY);
    }

    retry(): void {
        this.cleanup();
    }
}

const generationService = new GenerationService();
export default generationService;
