import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-component-valor',
  templateUrl: './edit-component-valor.component.html',
  styleUrls: ['./edit-component-valor.component.scss'],
})
export class EditComponentValorComponent implements OnInit {

  onAdd = new EventEmitter();
  
  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<EditComponentValorComponent>) { }

  valor
  ngOnInit() {}

  onButtonClicked() {
    this.onAdd.emit('test');
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
