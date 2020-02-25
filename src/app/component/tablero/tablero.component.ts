import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-tablero',
    templateUrl: './tablero.component.html',
    styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
    @Input() estado: string;
    @Input() marca: string;
    @Output() jugada = new EventEmitter<boolean>();

    public jugadas = [
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""},
        { value: ""}
    ];

    constructor() { }

    ngOnInit(): void {
    }

    onChangeJugada(index:number) {
        this.jugadas[index].value = this.marca;
        var bool = this.marca === 'X'? true : false;
        this.jugada.emit(bool);
    }
}