import { Component, OnInit, Input } from '@angular/core';
import { Hallazgo } from 'src/app/shared/hallazgo.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalChangeAreaComponent } from '../modal-change-area/modal-change-area.component';

@Component({
  selector: 'app-ficha-hallazgo',
  templateUrl: './ficha-hallazgo.component.html',
  styleUrls: ['./ficha-hallazgo.component.scss'],
})
export class FichaHallazgoComponent implements OnInit {

  @Input() hallazgo;
  @Input() whereID: number;
  @Input() plataformaID: number;
  @Input() permiso: number;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  ngOnChanges(){
  //console.log(JSON.stringify(this.hallazgo));
  }

  onCreate() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={'whereID': this.whereID,
                       'plataformaID': this.plataformaID,
                        'hallazgoID':this.hallazgo.hallazgoID};
    this.dialog.open(ModalChangeAreaComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
      // 
    });
 }
}
