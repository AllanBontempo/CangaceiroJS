class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._valor = $('#valor');
        this._quantidade = $('#quantidade');
        const self = this;

        this._negociacoes = new Proxy(new Negociacoes(), {
            get(target, prop, receiver) {
                if (typeof(target[prop]) === typeof(Function) && ['adiciona', 'esvazia'].includes(prop)){
                    return function () {
                        console.log(`"${prop} disparou a armadilha"`);
                        target[prop].apply(target, arguments);
                        self._negociacoesView.update(target);
                    }

                } else {
                    return target[prop];
                }
            }
        });
        this._negociacoesView = new NegociacoesView('#negociacoes');
        this._negociacoesView.update(this._negociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._mensagemView.update(this._mensagem);
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

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
    }

}
