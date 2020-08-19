import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PisoDetailComponent } from './piso-detail/piso-detail.component';
import { PisosComponent } from './pisos/pisos.component';
import { PuntuacionesDetailComponent } from './puntuaciones-detail/puntuaciones-detail.component';


const routes: Routes = [
  {path: '',   redirectTo: '/pisos', pathMatch: 'full' },
  {path:'pisos/:id',component:PisoDetailComponent},
  {path:'pisos',component:PisosComponent},
  {path:'puntuaciones/:id',component:PuntuacionesDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
