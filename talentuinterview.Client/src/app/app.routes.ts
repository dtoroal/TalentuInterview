import { Routes } from '@angular/router';
import { CharacterComponent } from './pages/character/character.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'employee/:emailEmployee/:characterId',
    component: CharacterComponent,
  },
  {
    path: 'employee',
    component: CharacterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
