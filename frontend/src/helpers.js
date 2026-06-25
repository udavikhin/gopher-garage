export const getInitials = (fullName) => {
    if (!fullName) return '';

    console.log(fullName)
    const words = fullName.trim().split(' ');
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());
    return initials.join('');
}

export const cleanObject = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== '' && v !== null && v !== undefined && v !== 0)
    );
}