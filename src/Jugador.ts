import { Dado } from "./Dado";

export class Jugador {
    public nombre: String;
    public puntoGanado: number;

    /**
     *
     * @param dado1 Primer dado a lanzar
     * @param dado2 Segundo dado a lanzar
     * @return Devuelve la suma de los puntos obtenidos en ambos dados
     */
    public lanzarDados(dado1: Dado, dado2: Dado){
        dado1.lanzar();
        dado1.lanzar();

        // Retornar los puntos que cayeron en los dados
        return (dado1.puntos + dado2.puntos);
    }
}