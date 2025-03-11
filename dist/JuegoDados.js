import { Jugador } from "./Jugador.js";
import { Dado } from "./Dado.js";
import { Jugada } from "./Jugada.js";
export class JuegoDados {
    constructor(nombreJugador1, nombreJugador2) {
        this.jugador1 = new Jugador();
        this.jugador1.nombre = nombreJugador1;
        this.jugador2 = new Jugador();
        this.jugador2.nombre = nombreJugador2;
        // Inicializa los marcadores a 0
        this.marcadorJugador1 = 0;
        this.marcadorJugador2 = 0;
        // Initialize missing properties
        this.dado1 = new Dado();
        this.dado2 = new Dado();
        this.esFinDeRonda = false; // inicialmente no es fin de ronda
        // Set initial player
        this.elegirPrimerLanzador();
        this.currentPlayer = this.bandJugador ? this.jugador1 : this.jugador2;
    }
    elegirPrimerLanzador() {
        this.bandJugador = Math.floor(Math.random() * 2) == 1;
    }
    iniciarJugada() {
        let jugadaActual = new Jugada();
        // Determinar jugador actual basado en bandJugador
        this.currentPlayer = this.bandJugador ? this.jugador1 : this.jugador2;
        // La clase Jugada maneja el lanzamiento de dados para el jugador actual
        jugadaActual.iniciarJugada(this.currentPlayer, this.dado1, this.dado2);
        // Actualizar puntuación según quién es el jugador actual
        if (this.bandJugador) {
            this.marcadorJugador1 += this.jugador1.puntoGanado;
            this.esFinDeRonda = false; // Turno del jugador 1, no es fin de ronda
        }
        else {
            this.marcadorJugador2 += this.jugador2.puntoGanado;
            this.esFinDeRonda = true; // Turno del jugador 2, es fin de ronda
        }
        // Cambiar turno para la próxima vez
        this.bandJugador = !this.bandJugador;
        // Actualizar quién será el próximo jugador
        this.currentPlayer = this.bandJugador ? this.jugador1 : this.jugador2;
    }
    esFinDeTurno() {
        return this.esFinDeRonda;
    }
    determinarVencedor() {
        // Solo determinar ganador si estamos al final de una ronda
        if (!this.esFinDeRonda) {
            return null;
        }
        // Caso de empate
        if ((this.marcadorJugador1 > 5) && (this.marcadorJugador2 > 5))
            return null;
        if (this.marcadorJugador1 > 5) {
            return this.jugador1;
        }
        else {
            if (this.marcadorJugador2 > 5) {
                return this.jugador2;
            }
        }
        return null;
    }
}
