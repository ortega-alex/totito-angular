import { Component, ViewChild } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { TableroComponent } from './component/tablero/tablero.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('jugadorBoton', [
            state('inactive', style({
                'border-bottom': 'solid 0px white'
            })),
            state('active', style({
                'border-bottom': 'solid 2px #26a69a'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-in'))
        ]),
        trigger('maquinaBoton', [
            state('inactive', style({
                'border-bottom': 'solid 0px white'
            })),
            state('active', style({
                'border-bottom': 'solid 2px #26a69a'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-in'))
        ])
    ]
})

export class AppComponent {
    @ViewChild(TableroComponent) tablero: TableroComponent; 

    public stateJugador: string = 'active';
    public stateMaquina: string = 'inactive';
    public estado: string = 'Comenzar partida o seleccionar jugador';
    public marca: string = "X";
    public x: number = 0;
    public o: number = 0;
    public ganador: boolean = false;
    public mensaje: string = null;

    constructor() { }

    ngOnInit() {

    }

    togleBotton() {
        this.stateJugador = this.stateJugador === 'active' ? 'inactive' : 'active';
        this.stateMaquina = this.stateMaquina === 'active' ? 'inactive' : 'active';
        this.estado = this.stateJugador === 'active' ? 'Turno X' : 'Turno O';
        this.marca = this.stateJugador === 'active' ? 'X' : 'O';
        if ( this.stateMaquina === 'active' ) {
            this.tablero.turnoMaquina();
        }
    }

    handleGanador(val) {
        if (val == 'X') {
            this.x++;
        } else {
            this.o++;
        }
        this.ganador = !this.ganador;
        this.mensaje = "El ganador es: " + val;
    }

    handleConfirGanador() {
        this.stateJugador = "active";
        this.stateMaquina = "inactive";
        this.estado = "Comenzar partida o seleccionar jugador";
        this.marca = "X";
        this.ganador = !this.ganador;
        this.mensaje = null;
    }
}
