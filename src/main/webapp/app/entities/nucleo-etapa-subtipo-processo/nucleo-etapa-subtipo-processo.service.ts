import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NucleoEtapaSubtipoProcesso>;

@Injectable()
export class NucleoEtapaSubtipoProcessoService {

    private resourceUrl =  SERVER_API_URL + 'api/nucleo-etapa-subtipo-processos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso): Observable<EntityResponseType> {
        const copy = this.convert(nucleoEtapaSubtipoProcesso);
        return this.http.post<NucleoEtapaSubtipoProcesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso): Observable<EntityResponseType> {
        const copy = this.convert(nucleoEtapaSubtipoProcesso);
        return this.http.put<NucleoEtapaSubtipoProcesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NucleoEtapaSubtipoProcesso>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NucleoEtapaSubtipoProcesso[]>> {
        const options = createRequestOption(req);
        return this.http.get<NucleoEtapaSubtipoProcesso[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NucleoEtapaSubtipoProcesso[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NucleoEtapaSubtipoProcesso = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NucleoEtapaSubtipoProcesso[]>): HttpResponse<NucleoEtapaSubtipoProcesso[]> {
        const jsonResponse: NucleoEtapaSubtipoProcesso[] = res.body;
        const body: NucleoEtapaSubtipoProcesso[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NucleoEtapaSubtipoProcesso.
     */
    private convertItemFromServer(nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso): NucleoEtapaSubtipoProcesso {
        const copy: NucleoEtapaSubtipoProcesso = Object.assign({}, nucleoEtapaSubtipoProcesso);
        copy.dataInicio = this.dateUtils
            .convertLocalDateFromServer(nucleoEtapaSubtipoProcesso.dataInicio);
        copy.dataFim = this.dateUtils
            .convertLocalDateFromServer(nucleoEtapaSubtipoProcesso.dataFim);
        return copy;
    }

    /**
     * Convert a NucleoEtapaSubtipoProcesso to a JSON which can be sent to the server.
     */
    private convert(nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso): NucleoEtapaSubtipoProcesso {
        const copy: NucleoEtapaSubtipoProcesso = Object.assign({}, nucleoEtapaSubtipoProcesso);
        copy.dataInicio = this.dateUtils
            .convertLocalDateToServer(nucleoEtapaSubtipoProcesso.dataInicio);
        copy.dataFim = this.dateUtils
            .convertLocalDateToServer(nucleoEtapaSubtipoProcesso.dataFim);
        return copy;
    }
}
