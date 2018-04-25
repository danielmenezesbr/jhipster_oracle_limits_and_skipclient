/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { NucleoEtapaSubtipoProcessoComponent } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.component';
import { NucleoEtapaSubtipoProcessoService } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.service';
import { NucleoEtapaSubtipoProcesso } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.model';

describe('Component Tests', () => {

    describe('NucleoEtapaSubtipoProcesso Management Component', () => {
        let comp: NucleoEtapaSubtipoProcessoComponent;
        let fixture: ComponentFixture<NucleoEtapaSubtipoProcessoComponent>;
        let service: NucleoEtapaSubtipoProcessoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [NucleoEtapaSubtipoProcessoComponent],
                providers: [
                    NucleoEtapaSubtipoProcessoService
                ]
            })
            .overrideTemplate(NucleoEtapaSubtipoProcessoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NucleoEtapaSubtipoProcessoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NucleoEtapaSubtipoProcessoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NucleoEtapaSubtipoProcesso(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.nucleoEtapaSubtipoProcessos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
