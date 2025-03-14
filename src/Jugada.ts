import { Dado } from "./Dado.js";
import { Jugador } from "./Jugador.js";

export class Jugada {
    /**
     * Este método hace la función del constructor
     */
    public iniciarJugada(jugadorActivo: Jugador, dado1: Dado, dado2: Dado) {
        // Lanzar los dados
        let puntos = jugadorActivo.lanzarDados(dado1, dado2);

        this.ganaUnPunto(jugadorActivo, puntos);
    }

    public ganaUnPunto(jugadorActivo: Jugador, puntos: number): void {
        if (puntos >= 8) {
            jugadorActivo.puntoGanado = 1;
        }
        else {
            jugadorActivo.puntoGanado = 0;
        }
    }
}