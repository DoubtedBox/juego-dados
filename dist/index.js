import { JuegoDados } from "./JuegoDados.js";
import { Dado } from "./Dado.js";
document.addEventListener("DOMContentLoaded", () => {
    const btnIniciar = document.getElementById("btn-iniciar");
    const btnJugar = document.getElementById("btn-jugar");
    const nombreJugador1Input = document.getElementById("jugador1");
    const nombreJugador2Input = document.getElementById("jugador2");
    const marcadorDiv = document.getElementById("marcador");
    const resultadoDiv = document.getElementById("resultado");
    const dado1Img = document.getElementById("dado1");
    const dado2Img = document.getElementById("dado2");
    const currentPlayer = document.getElementById("current-player");
    let juego = null;
    // Función para actualizar la interfaz con el marcador
    function actualizarMarcador() {
        if (juego) {
            marcadorDiv.innerHTML = `
                <div class="alert alert-primary">
                    ${juego.jugador1.nombre}: ${juego.marcadorJugador1} puntos <br>
                    ${juego.jugador2.nombre}: ${juego.marcadorJugador2} puntos
                </div>
            `;
        }
    }
    btnIniciar.addEventListener("click", () => {
        let nombreJugador1 = nombreJugador1Input.value;
        let nombreJugador2 = nombreJugador2Input.value;
        if (!nombreJugador1 || !nombreJugador2) {
            nombreJugador1 = "Jugador 1";
            nombreJugador2 = "Jugador 2";
        }
        juego = new JuegoDados(nombreJugador1, nombreJugador2);
        // Crear instancias de la clase Dado
        juego.dado1 = new Dado();
        juego.dado2 = new Dado();
        resultadoDiv.innerHTML = "";
        actualizarMarcador();
        btnJugar.disabled = false;
    });
    // Evento para jugar una jugada
    btnJugar.addEventListener("click", () => {
        if (!juego)
            return;
        juego.iniciarJugada();
        // Usar la función de animación con los valores finales de los dados
        animarDados(juego.dado1.puntos, juego.dado2.puntos);
        actualizarMarcador();
        // Indicate whose turn it is
        let currentPlayerName = juego.currentPlayer.nombre;
        currentPlayer.innerHTML = `<h2 id="current-player">Turno de: ${currentPlayerName}</div>`;
        // Verificar victoria solo al final de una ronda (después del turno del jugador 2)
        if (juego.esFinDeTurno()) {
            // Check if a player has won (more than 5 points)
            if (juego.marcadorJugador1 > 5 || juego.marcadorJugador2 > 5) {
                juego.vencedor = juego.determinarVencedor();
                let mensaje = `El juego ha terminado. `;
                mensaje += juego.vencedor ? `El ganador es: ${juego.vencedor.nombre}` : "Hubo un empate.";
                resultadoDiv.innerHTML = `<div class="alert alert-info">${mensaje}</div>`;
                btnJugar.disabled = true;
            }
        }
    });
    function animarDados(dado1Final, dado2Final) {
        // Duración total de la animación
        let duracionTotal = 1500; // 1.5 segundos
        // Deshabilitar el botón durante la animación
        btnJugar.disabled = true;
        // Añadir clase de animación a los dados
        dado1Img.classList.add('dado-girando');
        dado2Img.classList.add('dado-girando');
        // Función para generar un número aleatorio entre 1 y 6
        const numeroAleatorio = () => Math.floor(Math.random() * 6) + 1;
        // Tiempo de inicio
        const tiempoInicio = Date.now();
        // Función que se ejecuta en cada frame de la animación
        function animar() {
            // Calcular el tiempo transcurrido
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            // Si no hemos terminado la animación
            if (tiempoTranscurrido < duracionTotal) {
                // Calcular la velocidad de cambio (más lenta a medida que avanza la animación)
                // Al inicio cambia rápido, al final cambia lento
                const velocidadCambio = Math.max(50, Math.floor(100 * (tiempoTranscurrido / duracionTotal)));
                // Solo cambiar las imágenes si es momento de hacerlo
                if (tiempoTranscurrido % velocidadCambio < 20) {
                    dado1Img.src = `img/dado${numeroAleatorio()}.png`;
                    dado2Img.src = `img/dado${numeroAleatorio()}.png`;
                }
                // Continuar la animación
                requestAnimationFrame(animar);
            }
            else {
                // Finalizar la animación
                dado1Img.src = `img/dado${dado1Final}.png`;
                dado2Img.src = `img/dado${dado2Final}.png`;
                // Quitar clase de animación y añadir clase de detenido
                dado1Img.classList.remove('dado-girando');
                dado2Img.classList.remove('dado-girando');
                dado1Img.classList.add('dado-detenido');
                dado2Img.classList.add('dado-detenido');
                // Esperar un momento antes de habilitar el botón nuevamente
                setTimeout(() => {
                    btnJugar.disabled = false;
                    // Actualizar el marcador y UI
                    actualizarMarcador();
                    // Mostrar el jugador actual
                    let currentPlayerName = juego.currentPlayer.nombre;
                    currentPlayer.innerHTML = `<h2 id="current-player">Turno de: ${currentPlayerName}</h2>`;
                    // Verificar victoria solo al final de una ronda
                    if (juego.esFinDeTurno()) {
                        if (juego.marcadorJugador1 > 5 || juego.marcadorJugador2 > 5) {
                            juego.vencedor = juego.determinarVencedor();
                            if (juego.vencedor) {
                                let mensaje = `El juego ha terminado. El ganador es: ${juego.vencedor.nombre}`;
                                resultadoDiv.innerHTML = `<div class="alert alert-info">${mensaje}</div>`;
                                btnJugar.disabled = true;
                            }
                            else if (juego.marcadorJugador1 > 5 && juego.marcadorJugador2 > 5 &&
                                juego.marcadorJugador1 === juego.marcadorJugador2) {
                                // Caso de empate
                                resultadoDiv.innerHTML = `<div class="alert alert-info">El juego ha terminado. Hubo un empate.</div>`;
                                btnJugar.disabled = true;
                            }
                        }
                    }
                }, 500); // Pequeña pausa después de que los dados se detienen
            }
        }
        // Iniciar la animación
        animar();
    }
});
