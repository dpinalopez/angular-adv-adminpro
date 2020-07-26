import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})

export class IncrementadorComponent  implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() btnClass: string = 'btn-primary';
  @Input('valor') progreso: number = 50;
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();



  cambiarValor(valor: number){
    if (this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor <= 0){
      this.valorSalida.emit(0);
      return this.progreso = 100;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }
  onChange(nuevovalor: number){

    if (nuevovalor >= 100){
      this.progreso = 100;
    }
    else if (nuevovalor <=0) {
      this.progreso=0;
    }
    else {
      this.progreso=nuevovalor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
