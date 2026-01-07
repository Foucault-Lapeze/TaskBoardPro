  import {RouterModule, Routes} from '@angular/router';
  import {Home} from './home/home';
  import {About} from './about/about';
  import {NgModule} from '@angular/core';

  export const routes: Routes = [
    { path: '', component: Home},
    { path: 'about', component: About}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
