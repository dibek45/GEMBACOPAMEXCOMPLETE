import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.page.html',
  styleUrls: ['./plataforma.page.scss'],
})
export class PlataformaPage implements OnInit {
  usuario: string;
  whereID: number;
  whoID: number;
  tertiary: string;
  
  constructor(private storage: Storage,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
        this.tertiary="tertiary";
        this.route.params.subscribe(params => {
        this.usuario =params['usuario'];
        this.whereID =params['whereID'];
        this.whoID =params['whoID'];
    });
  }


  openPreview(plataforma){
    this.router.navigate(['/hallazgos/',{"plataformaID":plataforma,"usuario":this.usuario, "whereID":this.whereID, "whoID":this.whoID}]);
  }

  go(menu){
    if (menu='salir') {
      this.storage.set('who', null);
    this.storage.set('where', null);
    this.router.navigate(['/login',]);
    }
  }
}
