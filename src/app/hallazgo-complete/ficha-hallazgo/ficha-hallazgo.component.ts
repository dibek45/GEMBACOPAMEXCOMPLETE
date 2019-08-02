import { Component, OnInit, Input } from '@angular/core';
import { Hallazgo } from 'src/app/shared/hallazgo.model';

@Component({
  selector: 'app-ficha-hallazgo',
  templateUrl: './ficha-hallazgo.component.html',
  styleUrls: ['./ficha-hallazgo.component.scss'],
})
export class FichaHallazgoComponent implements OnInit {

  @Input() hallazgo;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
  //console.log(JSON.stringify(this.hallazgo));
  }

}
