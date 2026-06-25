import colorsJSON from "./data/colors.json";

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorGradient = (colorSlug) => {
    const color = colorsJSON[colorSlug];
    if (!color) return {};
    return { background: `linear-gradient(145deg, ${hexToRgba(color.hex, 0.18)} 0%, ${hexToRgba(color.hex, 0.06)} 100%)` };
};

export const getInitials = (fullName) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());
    return initials.join('');
}

export const cleanObject = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== '' && v !== null && v !== undefined && v !== 0)
    );
}