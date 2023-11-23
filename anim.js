document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('wave-container');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 300;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let offset = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, 150);

        for (let x = 0; x < canvas.width; x++) {
            let y = 150 + 50 * Math.sin((x + offset) * 0.03);
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'black';
        ctx.stroke();
        offset += 2;
        requestAnimationFrame(draw);
    }

    draw();
});

