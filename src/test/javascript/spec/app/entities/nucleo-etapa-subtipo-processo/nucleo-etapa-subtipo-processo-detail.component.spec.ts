/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { NucleoEtapaSubtipoProcessoDetailComponent } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo-detail.component';
import { NucleoEtapaSubtipoProcessoService } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.service';
import { NucleoEtapaSubtipoProcesso } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.model';

describe('Component Tests', () => {

    describe('NucleoEtapaSubtipoProcesso Management Detail Component', () => {
        let comp: NucleoEtapaSubtipoProcessoDetailComponent;
        let fixture: ComponentFixture<NucleoEtapaSubtipoProcessoDetailComponent>;
        let service: NucleoEtapaSubtipoProcessoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [NucleoEtapaSubtipoProcessoDetailComponent],
                providers: [
                    NucleoEtapaSubtipoProcessoService
                ]
            })
            .overrideTemplate(NucleoEtapaSubtipoProcessoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NucleoEtapaSubtipoProcessoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NucleoEtapaSubtipoProcessoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NucleoEtapaSubtipoProcesso(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nucleoEtapaSubtipoProcesso).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
