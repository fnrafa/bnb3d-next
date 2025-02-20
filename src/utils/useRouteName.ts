export const useRouteName = (path: string): string => {
    const baseRoute = path.split('/')[1] || 'How ideas turn into reality';
    return baseRoute.charAt(0).toUpperCase() + baseRoute.slice(1);
};

