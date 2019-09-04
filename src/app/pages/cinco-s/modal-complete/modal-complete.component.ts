import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-modal-complete',
  templateUrl: './modal-complete.component.html',
  styleUrls: ['./modal-complete.component.scss'],
})
export class ModalCompleteComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalCompleteComponent>) { }

  ngOnInit() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  completarPreguntas(){
    this.onCancel()
  }
}
