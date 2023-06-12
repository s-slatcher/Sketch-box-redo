const grid = document.querySelector("#grid-container");
const densSlider = document.querySelector("#density");
const eraser = document.querySelector("#eraser");
let mouseDown = false;
let prevDrawn;
let isEraser = false;

makeGrid(32);
setInterval(animateShadow, 500);

grid.addEventListener("mousedown", (e) => e.preventDefault(), false);

window.addEventListener("mousedown", (e) => {
    mouseDown = true;
})
window.addEventListener("mouseup", (e) => {
    mouseDown = false;
    prevDrawn = null;
})

eraser.addEventListener("mousedown",(e) => {
    if (!isEraser) {
        eraser.innerHTML = 'Brush'
    } else {
        eraser.innerHTML = 'Eraser'
    }
    isEraser = !isEraser;
})




document.querySelector("#density").addEventListener('change', newGrid)

function newGrid(e){
    const value = e.target.value
    document.querySelector("#dens-label").innerHTML = `${value} x ${value}`
    breakGrid();
    makeGrid(value);
    setInterval(animateShadow, 500);
}



function makeGrid(num){
    const gridWidth = 800;
    const pixelWidth = gridWidth/num;
    for (let i = 0; i < num*num; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add('shadow');
        pixel.id = `px${i+1}`
        pixel.setAttribute('style', 
            `width: ${pixelWidth}px; 
            height: ${pixelWidth}px
            background-color: white`);
        document.querySelector("#grid-container").appendChild(pixel);
        pixel.addEventListener("mousemove", (e) => {
            if (mouseDown && (e.target != prevDrawn)) {
                if (isEraser){
                    erase(e.target);
                } else {
                    draw(e.target);
                }
                // interpolate(e.target);
                prevDrawn = pixel;
            }
        })
    }
}

function breakGrid(){
    document.querySelectorAll(".pixel").forEach(element => {
        document.querySelector("#grid-container").removeChild(element);
    })
}

function animateShadow() {
        document.querySelectorAll(".pixel").forEach(element => {
        element.classList.remove('shadow')
    });
    
}

function draw(el){
    const strength = document.querySelector("#strength").value;
    const oldColor = window.getComputedStyle(el).backgroundColor;
    const newColor = document.querySelector("#color").value;
    el.style.backgroundColor = 
        `color-mix(in oklab, ${newColor} ${strength}%, ${oldColor})`;
    
}

function erase(el){
    el.style.backgroundColor = "white";
}

//totally busted
function interpolate(pixel){
    if(!prevDrawn){
        prevDrawn = pixel
        return;
    } 
    const rows = 800/pixel.style.width.slice(0,-2); 
    const b = {
        pos: +pixel.id.substring(2),
        row: Math.ceil(pixel.id.substring(2)/rows),
        column: Math.floor((((pixel.id.substring(2)-1)/rows)%1)*rows+1)
    }
    const a = {
        pos: +prevDrawn.id.substring(2),
        row: Math.ceil(prevDrawn.id.substring(2)/rows),
        column: Math.floor((((prevDrawn.id.substring(2)-1)/rows)%1)*rows+1)
    }
    console.log(a)
    console.log(b)
    
    const rowDelta = b.row-a.row;
    const columnDelta = b.column-a.column;
    console.log(rowDelta)
    console.log(columnDelta)
    
    if(Math.abs(rowDelta) < 2 && Math.abs(columnDelta) < 2){
        prevDrawn = pixel;
        return;
    }
    
    for(i = 0; i < (Math.abs(rowDelta) && Math.abs(columnDelta));i++){
        const interp = [];
        interp.pos = a.pos + (Math.sign(rowDelta)*rows*(i+1));
        interp.pos+= Math.sign(columnDelta)*(i+1);
        console.log(i);
        const diagonal = document.getElementById(`px${interp.pos}`);
        draw(diagonal);
    }
    
    prevDrawn = pixel;
}
