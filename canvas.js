
function counting(){
    var essay = document.getElementById("esay").value;
    var word = essay.toString();
    var count = word.split(' ')
    var hasil = count.length
    document.getElementById("numberWords").innerHTML = hasil
}

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40

let colorArray = [
    '#133046',
    '#15959F',
    '#02C39A',
    '#EC9770',
    '#C7402D'
]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

function Circle(x, y, dx , dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function(){
        context.beginPath()
        context.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'blue'
        context.fillStyle = this.color
        context.fill()
    }

    this.move = function(){

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        }

       this.x += this.dx
       this.y += this.dy

       if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
        if(this.radius < maxRadius){
            this.radius += 1;
        }   
       } else if(this.radius > this.minRadius){
           this.radius -= 1
       }
       

       this.draw()
    }
}



let circleArray = []

function init(){
    circleArray = []

    for(let i = 0; i < 300; i++){
        let radius = Math.random() * 4 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        

        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0,0 , innerWidth, innerHeight);
    
    for(let i = 0; i < circleArray.length; i++){
        
        circleArray[i].move();
    }
    
}

init()
animate()