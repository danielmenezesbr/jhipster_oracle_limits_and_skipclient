import { BaseEntity } from './../../shared';

export class NucleoEtapaSubtipoProcesso implements BaseEntity {
    constructor(
        public id?: number,
        public posicao?: number,
        public dataInicio?: any,
        public dataFim?: any,
        public status?: boolean,
        public subtipoProcesso?: BaseEntity,
    ) {
        this.status = false;
    }
}
