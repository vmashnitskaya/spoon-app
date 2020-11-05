export const createImageFromInitials = (size: number, name: string) => {
    const color = '#8d6e63';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    if (context) {
        context.fillStyle = `${color}`;
        context.fillRect(0, 0, size, size);

        context.fillStyle = '#ffffff';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.font = `${size / 2.5}px Arial`;
        context.fillText(name, size / 2, size / 2);
    }

    return canvas.toDataURL();
};

export default { createImageFromInitials };
