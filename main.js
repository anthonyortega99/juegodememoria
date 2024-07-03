// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let acertijos = 0;
const totalPares = 8; // Número total de pares en el juego

let tiempoTranscurrido = 0; // Tiempo en segundos
let cronometro = null;
let juegoPausado = false; // Variable para controlar el estado de pausa del juego

// Números aleatorios para las tarjetas
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// Función para iniciar el cronómetro
function iniciarCronometro() {
    cronometro = setInterval(() => {
        if (!juegoPausado) {
            tiempoTranscurrido++;
            document.getElementById("t-restante").innerHTML = `Tiempo: ${tiempoTranscurrido} segundos`;
        }
    }, 1000);
}

// Función para detener el cronómetro
function detenerCronometro() {
    clearInterval(cronometro);
}

// Función para pausar el juego
function pausarJuego() {
    detenerCronometro();
    juegoPausado = true;
    document.getElementById("pausa").style.display = "none";
    document.getElementById("reanudar").style.display = "inline";
    bloquearJuego();
}

// Función para reanudar el juego
function reanudarJuego() {
    iniciarCronometro();
    juegoPausado = false;
    document.getElementById("pausa").style.display = "inline";
    document.getElementById("reanudar").style.display = "none";
    desbloquearJuego();
}

// Función para bloquear el juego mientras está pausado
function bloquearJuego() {
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.disabled = true;
    }
}

// Función para desbloquear el juego cuando se reanuda
function desbloquearJuego() {
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        if (tarjeta.innerHTML === "") {
            tarjeta.disabled = false;
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    acertijos = 0;
    tiempoTranscurrido = 0;
    juegoPausado = false;

    document.getElementById("movimientos").innerHTML = "Movimientos: 0";
    document.getElementById("acertijos").innerHTML = "Acertijos: 0";
    document.getElementById("t-restante").innerHTML = "Tiempo: 0 segundos";

    numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numeros = numeros.sort(() => Math.random() - 0.5);
    console.log(numeros);

    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = "";
        tarjeta.disabled = false;
    }

    document.getElementById("pausa").style.display = "inline";
    document.getElementById("reanudar").style.display = "none";
    iniciarCronometro();
}

// Función principal
function destapar(id) {
    if (juegoPausado) {
        return;
    }

    if (tarjetasDestapadas === 0 && movimientos === 0) {
        iniciarCronometro();
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas === 1) {
        // Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        // Deshabilitar primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        // Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        // Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        document.getElementById("movimientos").innerHTML = `Movimientos: ${movimientos}`;

        // Comparar resultados
        if (primerResultado === segundoResultado) {
            // Coinciden
            tarjetasDestapadas = 0;
            acertijos++;
            document.getElementById("acertijos").innerHTML = `Acertijos: ${acertijos}`;

            // Verificar si el juego está completo
            if (acertijos === totalPares) {
                setTimeout(() => {
                    detenerCronometro();
                    alert("¡Felicidades! Has completado el juego.");
                }, 500);
            }
        } else {
            // No coinciden
            setTimeout(() => {
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 1000);
        }
    }
}

// Iniciar el juego al cargar la página
window.onload = reiniciarJuego;
