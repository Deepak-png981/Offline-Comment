const colors = ['blue', 'green', 'purple', 'orange', 'red', 'teal', 'pink', 'brown'];

export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];