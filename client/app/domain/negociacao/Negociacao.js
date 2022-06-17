class Negociacao {

    constructor(_data, _quantidade, _valor) {
        Object.assign(
            this,
            {
                _data: new Date(_data),
                _quantidade,
                _valor
            }
        );
        Object.freeze(this);
    }

    get volume() {
        return (this._quantidade * this._valor);
    }

    get data() {
        return this._data;
    }

    get valor() {
        return this._valor;
    }

    get quantidade() {
        return this._quantidade;
    }

    equals(negociacao) {
        return JSON.stringify(this) === JSON.stringify(negociacao);
    }
}
