import { Jugador } from "./Jugador.js";
import { Dado } from "./Dado.js";
import { Jugada } from "./Jugada.js";

export class JuegoDados {
    cantidadJugadas: number;
    jugador1: Jugador;
    jugador2: Jugador;
    marcadorJugador1: number;
    marcadorJugador2: number;
    dado1: Dado;
    dado2: Dado;
    vencedor: Jugador | null;
    currentPlayer: Jugador;
    private bandJugador: boolean;
    private esFinDeRonda: boolean; // true cuando el jugador 2 ha terminado su turno
    public numeroRonda: number;

    constructor(nombreJugador1: string, nombreJugador2: string) {
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
        this.numeroRonda = 1; // Iniciar en ronda 1
    }

    public elegirPrimerLanzador(): void{
        this.bandJugador = Math.floor(Math.random() * 2) == 1;
    }

    public iniciarJugada(): void { 
        let jugadaActual: Jugada = new Jugada();
        
        // Determinar jugador actual basado en bandJugador
        this.currentPlayer = this.bandJugador ? this.jugador1 : this.jugador2;
        
        // La clase Jugada maneja el lanzamiento de dados para el jugador actual
        jugadaActual.iniciarJugada(this.currentPlayer, this.dado1, this.dado2);
        
        // Actualizar puntuación según quién es el jugador actual
        if (this.bandJugador) {
            this.marcadorJugador1 += this.jugador1.puntoGanado;
            this.esFinDeRonda = false; // Turno del jugador 1, no es fin de ronda
        } else {
            this.marcadorJugador2 += this.jugador2.puntoGanado;
            this.esFinDeRonda = true; // Turno del jugador 2, es fin de ronda
            this.numeroRonda++;
        }
        
        // Cambiar turno para la próxima vez
        this.bandJugador = !this.bandJugador;
        // Actualizar quién será el próximo jugador
        this.currentPlayer = this.bandJugador ? this.jugador1 : this.jugador2;
    }

    public esFinDeTurno(): boolean {
        return this.esFinDeRonda;
    }

    public determinarVencedor(): Jugador{

                // Solo determinar ganador si estamos al final de una ronda
                if (!this.esFinDeRonda) {
                    return null;
                }

        // Caso de empate
        if((this.marcadorJugador1 > 5) && (this.marcadorJugador2 > 5))
            return null;

        if(this.marcadorJugador1 > 5){
            return this.jugador1;
        } else {
            if(this.marcadorJugador2 > 5) {
                return this.jugador2;
            }
        }

        return null;
    }
}