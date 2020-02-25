import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  public jugadas = [
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" },
    { value: "", usuario: "" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
