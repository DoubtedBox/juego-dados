export class Dado {
    /**
     * Este método simula el lanzamiento de un dado, mediante la función random
     * y asignando el valor al atributo puntos
     */
    lanzar() {
        this.puntos = Math.floor(Math.random() * 6) + 1; // Corrección aquí
    }
}
