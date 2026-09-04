import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Candidatos } from './pages/candidatos/candidatos';
import { CandidatoForm } from './pages/candidato-form/candidato-form';
import { CandidatoDetalhe } from './pages/candidato-detalhe/candidato-detalhe';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'candidatos', component: Candidatos },

  { path: 'candidatos/novo', component: CandidatoForm },
  { path: 'candidatos/:id', component: CandidatoDetalhe },
  { path: 'candidatos/:id/editar', component: CandidatoForm },

  { path: '**', redirectTo: '' },
];
