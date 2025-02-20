import {UserData} from "@/types/user";
import {TelegramUserData} from "@/types/telegram";

export interface MusicData {
    id: string;
    title: string;
    tags?: string;
    lyrics?: string;
    audioUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    state: string;
    taskId: string;
    userId?: string;
    telegramUserId?: string;
    user?: UserData;
    telegram?: TelegramUserData;
    createdAt: string;
    updatedAt: string;
}