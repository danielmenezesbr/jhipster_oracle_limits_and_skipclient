import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubtipoProcesso } from './subtipo-processo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubtipoProcesso>;

@Injectable()
export class SubtipoProcessoService {

    private resourceUrl =  SERVER_API_URL + 'api/subtipo-processos';

    constructor(private http: HttpClient) { }

    create(subtipoProcesso: SubtipoProcesso): Observable<EntityResponseType> {
        const copy = this.convert(subtipoProcesso);
        return this.http.post<SubtipoProcesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subtipoProcesso: SubtipoProcesso): Observable<EntityResponseType> {
        const copy = this.convert(subtipoProcesso);
        return this.http.put<SubtipoProcesso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubtipoProcesso>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubtipoProcesso[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubtipoProcesso[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubtipoProcesso[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubtipoProcesso = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubtipoProcesso[]>): HttpResponse<SubtipoProcesso[]> {
        const jsonResponse: SubtipoProcesso[] = res.body;
        const body: SubtipoProcesso[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubtipoProcesso.
     */
    private convertItemFromServer(subtipoProcesso: SubtipoProcesso): SubtipoProcesso {
        const copy: SubtipoProcesso = Object.assign({}, subtipoProcesso);
        return copy;
    }

    /**
     * Convert a SubtipoProcesso to a JSON which can be sent to the server.
     */
    private convert(subtipoProcesso: SubtipoProcesso): SubtipoProcesso {
        const copy: SubtipoProcesso = Object.assign({}, subtipoProcesso);
        return copy;
    }
}
