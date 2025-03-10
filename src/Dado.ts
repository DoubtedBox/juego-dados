export class Dado {
    public puntos:number;

    /**
     * Este método simula el lanzamiento de un dado, mediante la función random
     * y asignando el valor al atributo puntos
     */

    lanzar() {
        this.puntos = (Math.random() * (7 - 1))
    }
}