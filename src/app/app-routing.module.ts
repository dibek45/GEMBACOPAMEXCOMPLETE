import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'hallazgos', loadChildren: './hallazgos/hallazgos.module#HallazgosPageModule', },
  { path: 'complete-information', loadChildren: './modal/complete-information/complete-information.module#CompleteInformationPageModule' },
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule' },
 // { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'hallazgo-complete', loadChildren: './hallazgo-complete/hallazgo-complete.module#HallazgoCompletePageModule' },
  { path: 'imagen-modal', loadChildren: './imagen-modal/imagen-modal.module#ImagenModalPageModule' },
  { path: 'plataforma', loadChildren: './plataforma/plataforma.module#PlataformaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
