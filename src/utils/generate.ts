import axios from "axios";
import {io, Socket} from "socket.io-client";
import {getToken} from "@/utils/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "";
const SOCKET_URL = SOCKET_BASE_URL.startsWith("https")
    ? SOCKET_BASE_URL.replace("https", "wss")
    : SOCKET_BASE_URL.replace("http", "ws");

const TASK_KEY = "DND3D_AI_GENERATION_TASK";

export interface MeshData {
    id: string;
    timestamp?: number;
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
    private pollingInterval: NodeJS.Timeout | null = null;
    private lastUpdateTime: number = Date.now();
    private generationStartTime: number = Date.now();

    setStatusCallback(callback: CallbackFunction) {
        this.statusCallback = callback;
    }

    async startGeneration(prompt: string): Promise<MeshData | null> {
        const token = getToken();
        if (!token) return null;
        try {
            const response = await axios.post(
                `${API_BASE_URL}/model/generate`,
                {prompt},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            const taskData: MeshData = response.data.data;
            const taskWithTimestamp = {...taskData, timestamp: Date.now()};
            this.task = taskWithTimestamp;
            localStorage.setItem(TASK_KEY, JSON.stringify(taskWithTimestamp));
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
            const parsedTask: MeshData = JSON.parse(storedTask);
            if (Date.now() - (parsedTask.timestamp || 0) > 10 * 60 * 1000) {
                localStorage.removeItem(TASK_KEY);
                return;
            }
            const token = getToken();
            if (token) {
                this.task = parsedTask;
                this.initSocket(parsedTask.id, token);
            }
        }
    }

    private initSocket(taskId: string, token: string): void {
        this.socket = io(SOCKET_URL, {auth: {token}});
        this.generationStartTime = Date.now();
        this.lastUpdateTime = Date.now();

        this.socket.on(taskId, (data: StatusUpdate) => {
            this.lastUpdateTime = Date.now();
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.statusCallback && this.statusCallback(data.status, data.message);
            if (
                data.status.toLowerCase() === "done" ||
                data.status.toLowerCase() === "succeeded"
            ) {
                this.cleanup();
            }
        });

        this.pollingInterval = setInterval(() => {
            const now = Date.now();
            if (now - this.lastUpdateTime > 10000 && this.task) {
                axios
                    .get(`${API_BASE_URL}/model/result/${taskId}`)
                    .then((response) => {
                        const result = response.data;
                        if (result.status) {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            this.statusCallback && this.statusCallback(result.status, result.message);
                            if (
                                result.status.toLowerCase() === "done" ||
                                result.status.toLowerCase() === "succeeded"
                            ) {
                                this.cleanup();
                            }
                        }
                    })
                    .catch(() => {
                        this.cleanup();
                    });
            }
            if (now - this.generationStartTime > 600000) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.statusCallback && this.statusCallback("error", "Generation timed out.");
                this.cleanup();
            }
        }, 10000);
    }

    cleanup(): void {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
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
