const BLOCK_COLORS = [
    '#FFFFFF',
    '#FFFFFF',
    '#A5745B',
    '#745BA5',
    '#5B67A5',
    '#5BA55B',
    '#5BA55B',
    '#5B80A5',
    '#5B80A5',
    '#5B80A5',
    '#5BA58C',
    '#9fA55B',
    '#FF0000'
];

const BLOCK_TEXTS = [
    'START',
    'END',
    'INPUT',
    'OUTPUT',
    'NUMBER',
    'WHILE',
    'FOR',
    'IF',
    'ELSE',
    'SYMBOL',
    'TEXT',
    'COLOR'
];

const draw = (canvas, blocks) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (blocks) {
        const times = blocks[blocks.length - 1].x + 2;
        let line = 1;
        let length = Math.floor((canvas.width - 120) / times) - 2;
        while (length <= 40) {
            let temp = length;
            line++;
            length = Math.floor((canvas.width - 120) * line / times) - 2;
            if (5 * line * (length + 2) >= canvas.height) {
                line--;
                length = temp;
                break;
            }
        }
        length = length > 56 ? 56 : length;
        let count = Math.floor((canvas.width - 120) / (length + 2));
        for (let i = 0; i < blocks.length; i++) {
            let { type, x, y, value, symbol } = blocks[i];
            let row = Math.floor(x / count);
            let col = x % count;
            ctx.fillStyle = BLOCK_COLORS[type - 1];
            let pointX = (length + 2) * (col + 2) - 2;
            let pointY = (canvas.height / line) / 2 + (canvas.height / line) * row - y * (length + 2) - length / 2 + (line > 1 ? length : 0);
            let text;
            let width;
            ctx.fillRect(pointX, pointY, length, length);
            ctx.fillStyle = 'black';
            switch (blocks[i].type) {
                case 1:
                case 2:
                case 6:
                case 8:
                case 9:
                    text = BLOCK_TEXTS[type - 1];
                    if (length <= 32) {
                        text = text.charAt(0);
                    }
                    ctx.font = "12px sans-serif";
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 2 + 6);
                    break;
                case 3:
                case 4:
                    ctx.font = length - 6 + "px sans-serif";
                    text = symbol;
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 4 * 3 + 2);
                    break;
                case 5:
                    ctx.font = "14px sans-serif";
                    text = value;
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 2 + 7);
                    break;
                case 7:
                    text = BLOCK_TEXTS[type - 1];
                    if (length <= 32) {
                        text = text.charAt(0);
                    }
                    text += '-' + value;
                    ctx.font = "12px sans-serif";
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 2 + 6);
                    break;
                case 10:
                    ctx.font = length - 10 + "px sans-serif";;
                    text = symbol;
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 4 * 3);
                    break;
                case 11:
                    ctx.font = "14px sans-serif";
                    text = blocks[i].value;
                    if (ctx.measureText(text).width >= length) {
                        text = '......';
                    }
                    width = ctx.measureText(text).width;
                    ctx.fillText(text, pointX + (length - width) / 2, pointY + length / 2 + 5);
                    break;
                case 12:
                    width = length - 8;
                    ctx.fillStyle = blocks[i].value;
                    ctx.fillRect(pointX + 4, pointY + 4, width, width);
                    break;
                case 13:
                    ctx.strokeStyle = 'black';
                    ctx.beginPath();
                    ctx.moveTo(pointX, pointY);
                    ctx.lineTo(pointX + length, pointY + length);
                    ctx.moveTo(pointX + length, pointY);
                    ctx.lineTo(pointX, pointY + length);
                    ctx.stroke();
                default:
                    break;
            }
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, (canvas.height / line) / 2 - length + (line > 1 ? length : 0), length * 2, length * 2);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        for (let i = 1; i < line; i++) {
            let startX = (length + 2) * (count + 1) - 2 + length / 2;
            let startY = (canvas.height / line) / 2 + (canvas.height / line) * (i - 1) + length / 2 + (line > 1 ? length : 0);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY + length);
            ctx.lineTo(length, startY + length);
            ctx.lineTo(length, startY + canvas.height / line - length / 2);
            ctx.lineTo(length * 2 + 2, startY + canvas.height / line - length / 2);
            ctx.stroke();
        }
    }
}

export default draw;
