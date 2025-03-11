export class Jugada {
    /**
     * Este método hace la función del constructor
     */
    iniciarJugada(jugadorActivo, dado1, dado2) {
        // Lanzar los dados
        let puntos = jugadorActivo.lanzarDados(dado1, dado2);
        this.ganaUnPunto(jugadorActivo, puntos);
    }
    ganaUnPunto(jugadorActivo, puntos) {
        if (puntos >= 8) {
            jugadorActivo.puntoGanado = 1;
        }
        else {
            jugadorActivo.puntoGanado = 0;
        }
    }
}
