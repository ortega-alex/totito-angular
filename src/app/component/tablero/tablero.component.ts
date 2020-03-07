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
    private victorias = [];
    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('victorias') != null) {
            this.victorias = JSON.parse(localStorage.getItem('victorias'));
        }
    }

    private onChangeJugada(index: number) {
        this.jugadas[index].value = this.marca;
        var bool = this.marca === 'X' ? true : false;
        if (this.handleVictoria() === true) {
            this.victoria.emit(this.marca);
        } else {
            this.jugada.emit(bool);
        }
    }

    private handleAlmacenarVictorias(victoria) {
        if (localStorage.getItem('victorias') === null) {
            this.victorias.push(victoria);
            localStorage.setItem('victorias', JSON.stringify(this.victorias));
        } else {
            this.victorias = JSON.parse(localStorage.getItem('victorias'));
            this.victorias.push(victoria);
            localStorage.setItem('victorias', JSON.stringify(this.victorias));
        }
    }

    private handleVictoria() {
        // HORIZONTAL
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[1].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[2].value)) &&
            (this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[2].value))) {
            this.handleAlmacenarVictorias('0,1,2');
            return true;
        }

        if ((this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[5].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[5].value))) {
            this.handleAlmacenarVictorias('3,4,5');
            return true;
        }

        if ((this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[7].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[8].value))) {
            this.handleAlmacenarVictorias('6,7,8');
            return true;
        }

        // VERTICAL
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[3].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[6].value)) &&
            (this.handleValor(this.jugadas[3].value) === this.handleValor(this.jugadas[6].value))) {
            this.handleAlmacenarVictorias('0,3,6');
            return true;
        }

        if ((this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[1].value) === this.handleValor(this.jugadas[7].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[7].value))) {
            this.handleAlmacenarVictorias('2,4,7');
            return true;
        }

        if ((this.handleValor(this.jugadas[2].value) === this.handleValor(this.jugadas[5].value)) &&
            (this.handleValor(this.jugadas[2].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[5].value) === this.handleValor(this.jugadas[8].value))) {
            this.handleAlmacenarVictorias('3,5,8');
            return true;
        }

        // PERPENDICULAR
        if ((this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[0].value) === this.handleValor(this.jugadas[8].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[8].value))) {
            this.handleAlmacenarVictorias('0,4,8');
            return true;
        }

        if ((this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[4].value)) &&
            (this.handleValor(this.jugadas[6].value) === this.handleValor(this.jugadas[2].value)) &&
            (this.handleValor(this.jugadas[4].value) === this.handleValor(this.jugadas[2].value))) {
            this.handleAlmacenarVictorias('2,4,6');
            return true;
        }

        return false;
    }

    private handleValor(val) {
        if (val.toString().trim() === "" || val === null) {
            return Math.random();
        }
        return val;
    }

    public turnoMaquina() {
        console.log(this.victorias);
        var _jugadas = [];
        this.jugadas.forEach((element, index) => {
            if (element.value === 'X') {
                this.victorias.forEach(item => {
                    if (item.indexOf(index) >= 0) {
                        item.split(',').forEach(num => {
                            if (this.jugadas[num].value === "") {
                                _jugadas.push(num);
                            }
                        });
                    }
                });
            }
        });

        if (_jugadas.length === 0) {
            var num = this.numeroAleatorio(0, 8);
            if (this.jugadas[num].value === "" || this.jugadas[num].value === null) {
                setTimeout(() => {
                    this.onChangeJugada(num);
                }, 1000);
            } else {
                this.turnoMaquina();
            }
        } else {
            setTimeout(() => {
                this.onChangeJugada(_jugadas[0]);
            }, 1000);
        }
    }

    private numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}