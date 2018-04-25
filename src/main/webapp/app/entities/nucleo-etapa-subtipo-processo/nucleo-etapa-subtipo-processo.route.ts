import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NucleoEtapaSubtipoProcessoComponent } from './nucleo-etapa-subtipo-processo.component';
import { NucleoEtapaSubtipoProcessoDetailComponent } from './nucleo-etapa-subtipo-processo-detail.component';
import { NucleoEtapaSubtipoProcessoPopupComponent } from './nucleo-etapa-subtipo-processo-dialog.component';
import { NucleoEtapaSubtipoProcessoDeletePopupComponent } from './nucleo-etapa-subtipo-processo-delete-dialog.component';

export const nucleoEtapaSubtipoProcessoRoute: Routes = [
    {
        path: 'nucleo-etapa-subtipo-processo',
        component: NucleoEtapaSubtipoProcessoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.nucleoEtapaSubtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nucleo-etapa-subtipo-processo/:id',
        component: NucleoEtapaSubtipoProcessoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.nucleoEtapaSubtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nucleoEtapaSubtipoProcessoPopupRoute: Routes = [
    {
        path: 'nucleo-etapa-subtipo-processo-new',
        component: NucleoEtapaSubtipoProcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.nucleoEtapaSubtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nucleo-etapa-subtipo-processo/:id/edit',
        component: NucleoEtapaSubtipoProcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.nucleoEtapaSubtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nucleo-etapa-subtipo-processo/:id/delete',
        component: NucleoEtapaSubtipoProcessoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.nucleoEtapaSubtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
