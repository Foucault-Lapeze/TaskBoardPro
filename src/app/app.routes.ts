  import {RouterModule, Routes} from '@angular/router';
  import {Home} from './home/home';
  import {NgModule} from '@angular/core';
  import {Tasks} from './tasks/tasks';

  export const routes: Routes = [
    { path: '', component: Home},
    { path: 'about', loadComponent: () => import('./about/about').then(m => m.About) },
    { path: 'tasks', loadComponent: () => import('./tasks/tasks').then(m => m.Tasks) }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }

