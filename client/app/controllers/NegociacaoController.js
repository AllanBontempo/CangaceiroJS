class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._valor = $('#valor');
        this._quantidade = $('#quantidade');
        this._negociacoes = new Negociacoes();
    }

    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._limpaForm();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.paraData(this._data.value),
            parseInt(this._quantidade.value),
            parseFloat(this._valor.value)
        );
    }

    _limpaForm() {
        this._data.value = "";
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }

}
