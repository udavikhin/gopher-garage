export const getInitials = (fullName) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join('');
}