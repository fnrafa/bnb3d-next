import {UserData} from "@/types/user";

export interface MeshData {
    id: string;
    prompt: string;
    totalView: number;
    taskId: string;

    modelGlb?: string;
    modelFbx?: string;
    modelUsdz?: string;
    Image?: string;

    userId?: string;
    user?: UserData;

    state: string;
    createdAt: string;
    updatedAt: string;
}