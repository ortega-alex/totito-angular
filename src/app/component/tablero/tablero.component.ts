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
    @Output() victoria = new EventEmitter<String>();

    public jugadas = [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" }
    ];

    constructor() { }

    ngOnInit(): void {
    }

    onChangeJugada(index: number) {
        this.jugadas[index].value = this.marca;
        var bool = this.marca === 'X' ? true : false;
        if (this.handleVictoria() === true) {
            this.victoria.emit(this.marca);
        } else {
            this.jugada.emit(bool);
        }
    }


    handleVictoria() {
        // HORIZONTAL
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[1].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[2].value)) &&
            (this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[2].value))) {
            return true;
        }

        if ((this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[5].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[5].value))) {
            return true;
        }

        if ((this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[7].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[8].value))) {
            return true;
        }

        // VERTICAL
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[3].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[6].value)) &&
            (this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[6].value))) {
            return true;
        }

        if ((this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[7].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[7].value))) {
            return true;
        }

        if ((this.handleValor(this.jugadas[2].value) === this.handleValor(this.jugadas[5].value)) &&
            (this.handleValor(this.jugadas[2].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[5].value) === this.handleValor(this.jugadas[8].value))) {
            return true;
        }

        // PERPENDICULAR
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[8].value))) {
            return true;
        }

        if ((this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[2].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[2].value))) {
            return true;
        }

        return false;
    }

    handleValor(val) {
        if (val.toString().trim() === "" || val === null) {
            return Math.random();
        }
        return val;
    }

    turnoMaquina() {
        var num = this.numeroAleatorio(0, 8);
        if (this.jugadas[num].value === "" || this.jugadas[num].value === null) {
            setTimeout(() => {
                this.onChangeJugada(num);
            }, 1000);
        } else {
            this.turnoMaquina();
        }
    }

    numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}