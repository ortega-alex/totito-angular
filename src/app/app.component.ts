import { Component } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

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
    public stateJugador: string = 'active';
    public stateMaquina: string = 'inactive';
    public jugadas = [
        {value : "X", usuario: ""},
        {value : "O", usuario: ""},
        {value : "X", usuario: ""},
        {value : "O", usuario: ""},
        {value : "", usuario: ""},
        {value : "", usuario: ""},
        {value : "", usuario: ""},
        {value : "", usuario: ""},
        {value : "", usuario: ""}
    ]    

    constructor() { }

    ngOnInit() {

    }

    togleBotton() {
        this.stateJugador = this.stateJugador === 'active' ? 'inactive' : 'active';
        this.stateMaquina = this.stateMaquina === 'active' ? 'inactive' : 'active';
    }
}
