import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterOracleLimitsAndSkipclientNucleoEtapaSubtipoProcessoModule } from './nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.module';
import { JhipsterOracleLimitsAndSkipclientSubtipoProcessoModule } from './subtipo-processo/subtipo-processo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterOracleLimitsAndSkipclientNucleoEtapaSubtipoProcessoModule,
        JhipsterOracleLimitsAndSkipclientSubtipoProcessoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOracleLimitsAndSkipclientEntityModule {}
