import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubtipoProcessoComponent } from './subtipo-processo.component';
import { SubtipoProcessoDetailComponent } from './subtipo-processo-detail.component';
import { SubtipoProcessoPopupComponent } from './subtipo-processo-dialog.component';
import { SubtipoProcessoDeletePopupComponent } from './subtipo-processo-delete-dialog.component';

export const subtipoProcessoRoute: Routes = [
    {
        path: 'subtipo-processo',
        component: SubtipoProcessoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.subtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subtipo-processo/:id',
        component: SubtipoProcessoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.subtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subtipoProcessoPopupRoute: Routes = [
    {
        path: 'subtipo-processo-new',
        component: SubtipoProcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.subtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subtipo-processo/:id/edit',
        component: SubtipoProcessoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.subtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subtipo-processo/:id/delete',
        component: SubtipoProcessoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterOracleLimitsAndSkipclientApp.subtipoProcesso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
