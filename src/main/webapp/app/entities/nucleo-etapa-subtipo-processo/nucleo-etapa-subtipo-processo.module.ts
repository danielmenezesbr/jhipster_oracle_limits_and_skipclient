import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterOracleLimitsAndSkipclientSharedModule } from '../../shared';
import {
    NucleoEtapaSubtipoProcessoService,
    NucleoEtapaSubtipoProcessoPopupService,
    NucleoEtapaSubtipoProcessoComponent,
    NucleoEtapaSubtipoProcessoDetailComponent,
    NucleoEtapaSubtipoProcessoDialogComponent,
    NucleoEtapaSubtipoProcessoPopupComponent,
    NucleoEtapaSubtipoProcessoDeletePopupComponent,
    NucleoEtapaSubtipoProcessoDeleteDialogComponent,
    nucleoEtapaSubtipoProcessoRoute,
    nucleoEtapaSubtipoProcessoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...nucleoEtapaSubtipoProcessoRoute,
    ...nucleoEtapaSubtipoProcessoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterOracleLimitsAndSkipclientSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NucleoEtapaSubtipoProcessoComponent,
        NucleoEtapaSubtipoProcessoDetailComponent,
        NucleoEtapaSubtipoProcessoDialogComponent,
        NucleoEtapaSubtipoProcessoDeleteDialogComponent,
        NucleoEtapaSubtipoProcessoPopupComponent,
        NucleoEtapaSubtipoProcessoDeletePopupComponent,
    ],
    entryComponents: [
        NucleoEtapaSubtipoProcessoComponent,
        NucleoEtapaSubtipoProcessoDialogComponent,
        NucleoEtapaSubtipoProcessoPopupComponent,
        NucleoEtapaSubtipoProcessoDeleteDialogComponent,
        NucleoEtapaSubtipoProcessoDeletePopupComponent,
    ],
    providers: [
        NucleoEtapaSubtipoProcessoService,
        NucleoEtapaSubtipoProcessoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOracleLimitsAndSkipclientNucleoEtapaSubtipoProcessoModule {}
