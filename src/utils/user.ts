    export interface UserData {
        id: string;
        username: string;
        address: string;
        point: number;
        token: string;
        walletType: string;
    }

    const USER_KEY = "DND3D_AI_USER";

    const isBrowser = (): boolean => typeof window !== "undefined";

    export const saveUser = (data: UserData): void => {
        if (!isBrowser()) return;

        try {
            localStorage.setItem(USER_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    export const getUser = (): UserData | null => {
        if (!isBrowser()) return null;

        try {
            const storedData = localStorage.getItem(USER_KEY);
            if (!storedData) return null;

            const parsedData = JSON.parse(storedData);
            if (
                parsedData &&
                typeof parsedData.id === "string" &&
                typeof parsedData.username === "string" &&
                typeof parsedData.address === "string" &&
                typeof parsedData.point === "number" &&
                typeof parsedData.token === "string" &&
                typeof parsedData.walletType === "string"
            ) {
                return parsedData as UserData;
            }

            return null;
        } catch (error) {
            console.error("Error retrieving user data:", error);
            return null;
        }
    };

    export const clearUser = (): void => {
        if (!isBrowser()) return;

        try {
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error("Error clearing user data:", error);
        }
    };

    export const getToken = (): string | null => {
        const user = getUser();
        return user?.token || null;
    };

    export const getUsername = (): string | null => {
        const user = getUser();
        return user?.username || null;
    };
