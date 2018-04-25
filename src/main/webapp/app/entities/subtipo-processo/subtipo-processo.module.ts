import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterOracleLimitsAndSkipclientSharedModule } from '../../shared';
import {
    SubtipoProcessoService,
    SubtipoProcessoPopupService,
    SubtipoProcessoComponent,
    SubtipoProcessoDetailComponent,
    SubtipoProcessoDialogComponent,
    SubtipoProcessoPopupComponent,
    SubtipoProcessoDeletePopupComponent,
    SubtipoProcessoDeleteDialogComponent,
    subtipoProcessoRoute,
    subtipoProcessoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subtipoProcessoRoute,
    ...subtipoProcessoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterOracleLimitsAndSkipclientSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubtipoProcessoComponent,
        SubtipoProcessoDetailComponent,
        SubtipoProcessoDialogComponent,
        SubtipoProcessoDeleteDialogComponent,
        SubtipoProcessoPopupComponent,
        SubtipoProcessoDeletePopupComponent,
    ],
    entryComponents: [
        SubtipoProcessoComponent,
        SubtipoProcessoDialogComponent,
        SubtipoProcessoPopupComponent,
        SubtipoProcessoDeleteDialogComponent,
        SubtipoProcessoDeletePopupComponent,
    ],
    providers: [
        SubtipoProcessoService,
        SubtipoProcessoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOracleLimitsAndSkipclientSubtipoProcessoModule {}
