const tabla = document.getElementById('Tabla');
const tablapuntos = document.getElementById('tablapuntos');
const start = document.getElementById('start');
const perdisteSeñal= document.getElementById('perdiste');


//sets basicos
const tablaSize= 10;
const juegoSpeed= 100;
const cuadradosType ={
    vacio:0,
    serpiente:1,
    comida:2
}

const direciones ={
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft:-1
}

//variables del juego

let serpiente=[];
let puntaje;
let Direccion;
let cuadradostablero;
let cuadradosvacios;
let intervaloMovimiento;
let animation;
let opuestanimation

const iniciaserpiente= ()=>{

    serpiente.forEach(cuadrado => 
    dibujar(cuadrado, 'serpiente')      
    );
    document.getElementById(serpiente[serpiente.length-1]).setAttribute('class', `cuadrado cuadradoserpiente ${animation}`)
   


    
}

const dibujar = (cuadrado, type)=>{
    const [row, column]= cuadrado.split('');
    cuadradostablero[row][column] = cuadradosType[type];
    const cuadradoelemento = document.getElementById(cuadrado);
    cuadradoelemento.setAttribute('class', `cuadrado cuadrado${type}`);
    if (type === 'vacio') {
        cuadradosvacios.push(cuadrado);
        
    }else{
        if(cuadradosvacios.indexOf(cuadrado) !==-1){
            cuadradosvacios.splice(cuadradosvacios.indexOf(cuadrado), 1)
        }
    }


}

const setanimation= (Direccion)=>{
    animation= Direccion
    switch(Direccion){
        case 'ArrowUp': 
        opuestanimation= 'ArrowDown'
        break;
        case 'ArrowDown': 
        opuestanimation= 'ArrowUp'
   
        break;
        case 'ArrowLeft': 
        opuestanimation= 'ArrowRight'
        break;
        case 'ArrowRight': 
        opuestanimation= 'ArrowLeft'

        break;
    }
}

const setDireccion = (nuevaDireccion) =>{
    Direccion= nuevaDireccion;
    setanimation(Direccion);
}
const DireccionEvent= key =>{

    switch(key.code){
        case 'ArrowUp': 
        Direccion != 'ArrowDown' && setDireccion(key.code) 
        
        break;
        case 'ArrowDown': 
        Direccion != 'ArrowUp' && setDireccion(key.code)
   
        break;
        case 'ArrowLeft': 
        Direccion != 'ArrowRight' && setDireccion(key.code)
        break;
        case 'ArrowRight': 
        Direccion != 'ArrowLeft' && setDireccion(key.code)

        break;
    }
    

}
const crearcomida = ()=>{
    const posicion = cuadradosvacios[ Math.floor(Math.random()* cuadradosvacios.length)];
  dibujar(posicion, 'comida');


}

const serpientemueve = ()=>{
    const nuevaserpiente = String(
        Number(serpiente[serpiente.length -1]) + direciones[Direccion] ).padStart(2, '0');

    const [row, column]= nuevaserpiente.split('');

    if(
        nuevaserpiente < 0 || 
        nuevaserpiente> tablaSize*tablaSize || 
        (Direccion =='ArrowRight' && column ==0) ||
    (Direccion =='ArrowLeft' && column == tablaSize-1) ||
    cuadradostablero[row][column]=== cuadradosType.serpiente
     ){
        gameover();
        console.log(row, column)
        console.log(cuadradostablero+ 'este');

     }else{
    serpiente.push(nuevaserpiente);
    if(cuadradostablero[row][column] === cuadradosType.comida){
        addcomida();
    }else{
        const cuadradovacio= serpiente.shift();
        dibujar(cuadradovacio, 'vacio');

    }
    iniciaserpiente();
    
     }
}

const addcomida= ()=>{
    puntaje++;
    puntajeupdate();
    crearcomida();
}

const gameover = ()=>{
    perdisteSeñal.style.display='block';
    clearInterval(intervaloMovimiento);
    start.disabled= false

}

const setGame = ()=>{
    
    let coo= tablaSize.toString().length
    console.log(coo)
    tabla.style.gridTemplateColumns=`repeat(${tablaSize}, 1fr)` 
  
        
        serpiente=['01', '02' , '03' , '04']
   
    

   animation="right";
    console.log(serpiente)
    puntaje = serpiente.length;
    Direccion= 'ArrowRight';
    cuadradostablero= Array.from(Array(tablaSize), ()=> new Array(tablaSize).fill(cuadradosType.vacio))
    console.log(cuadradostablero);
    tabla.innerHTML='';
    cuadradosvacios=[];
    createBoard();

}
const puntajeupdate= ()=>{
    tablapuntos.innerText=puntaje
}
const createBoard = ()=>{
    cuadradostablero.forEach((row, rowIndex )=> {
        row.forEach((column, columnIndex )=> {
            const cuadradovalor=`${String(rowIndex)}${String(columnIndex)}`;
            const elementoCuadrado = document.createElement('div');
            elementoCuadrado.setAttribute('class', 'cuadrado cuadradovacio')
            elementoCuadrado.setAttribute('id', cuadradovalor);
            tabla.appendChild(elementoCuadrado)
            cuadradosvacios.push(cuadradovalor);
        });
    });

}

const startGame= ()=>{
    setGame();
    perdisteSeñal.style.display= 'none';
    start.disabled = true;
  iniciaserpiente();
  puntajeupdate();
    crearcomida();
    document.addEventListener('keydown', DireccionEvent);
    intervaloMovimiento = setInterval(() => serpientemueve(), juegoSpeed);
}

start.addEventListener('click', startGame);