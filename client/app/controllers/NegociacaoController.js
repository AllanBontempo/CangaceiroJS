class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._valor = $('#valor');
        this._quantidade = $('#quantidade');
    }

    adiciona(event) {
        event.preventDefault();
        let data = DateConverter.paraData(this._data.value);

        const negociacao = new Negociacao(
            data, parseInt(this._quantidade.value), parseFloat(this._valor.value)
        );
    }

}
