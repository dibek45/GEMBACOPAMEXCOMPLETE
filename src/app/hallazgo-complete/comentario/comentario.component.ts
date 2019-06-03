import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent implements OnInit {
  @Output() comentarioOutput = new EventEmitter<string>();
  @Input() comentario:string;

  constructor() { }

  ngOnInit() {}

  sendComentario(){
    if (this.comentario!=undefined) {
      this.comentarioOutput.emit(this.comentario)
    }
  
  }
}
