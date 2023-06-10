


document.querySelector("#make").addEventListener('click', () => {
    breakGrid();
    makeGrid(Number(prompt("Enter an integer between 8 - 128", "16")));
    setInterval(animateShadow, 100);
})

function makeGrid(num){
    const gridWidth = 800;
    const pixelWidth = gridWidth/num;
    for (let i = 0; i < num*num; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add('shadow');
        pixel.id = `px${i+1}`
        pixel.setAttribute('style', `width: ${pixelWidth}px; height: ${pixelWidth}px`);
        document.querySelector("#grid-container").appendChild(pixel);
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