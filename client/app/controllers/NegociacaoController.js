class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._valor = $('#valor');
        this._quantidade = $('#quantidade');
    }

    adiciona(event) {
        event.preventDefault();

        const negociacao = new Negociacao(this._data.value,
            parseInt(this._quantidade.value), parseFloat(this._valor.value));
    }

}
