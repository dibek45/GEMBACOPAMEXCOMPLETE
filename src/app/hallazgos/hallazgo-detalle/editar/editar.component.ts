import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

  @Input() image: string;
  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  @Output() base64Image = new EventEmitter<string>();
  verBoton:boolean;
  constructor() { 
    this.verBoton=true;
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.verBoton=false;
    this.verBoton=true;
   // alert("onChange"+JSON.stringify(this.image));
  }

  saveCanvasData(){
    let generatedString = this.canvasWhiteboard.generateCanvasDataUrl("image/jpeg", 0.3);
    this.base64Image.emit(generatedString);
    this.verBoton=false;
  }
}


