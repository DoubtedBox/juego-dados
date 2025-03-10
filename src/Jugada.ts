import { Dado } from "./Dado";
import { Jugador } from "./Jugador";

export class Jugada {
    /**
     * Este método hace la función del constructor
     */
    public iniciarJugada(jugador1: Jugador, jugador2: Jugador,
        dado1: Dado, dado2: Dado) {
        // Recibir los objetos necesarios para la jugada
        //Lanzar los dados por turno
        let puntosJ1: number = this.turnarJugador(jugador1, dado1, dado2);
        let puntosJ2: number = this.turnarJugador(jugador2, dado1, dado2);

        this.determinarGanador(jugador1, puntosJ1, jugador2, puntosJ2);
    }

    private turnarJugador(jugadorEnTurno: Jugador, dado1: Dado, dado2: Dado): number {
        return jugadorEnTurno.lanzarDados(dado1, dado2);
    }

    public determinarGanador(jugador1: Jugador, puntuacionJ1: number,
        jugador2: Jugador, puntuacionJ2: number): void {
        if (puntuacionJ1 == 7) {
            jugador1.puntoGanado = 1;
        }
        else {
            jugador1.puntoGanado = 0;
        }

        if (puntuacionJ2 == 7) {
            jugador2.puntoGanado = 1;
        }
        else {
            jugador2.puntoGanado = 0;
        }
    }
}