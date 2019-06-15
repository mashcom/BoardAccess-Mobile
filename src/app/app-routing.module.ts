import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lander',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:id',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'viewer/:id', loadChildren: './viewer/viewer.module#ViewerPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'meetings/:id', loadChildren: './meetings/meetings.module#MeetingsPageModule' },
  { path: 'lander', loadChildren: './lander/lander.module#LanderPageModule' },
  { path: 'decisions', loadChildren: './decisions/decisions.module#DecisionsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
