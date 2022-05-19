class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._valor = $('#valor');
        this._quantidade = $('#quantidade');
        this._service = new NegociacaoService();
        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');
    }

    adiciona(event) {

        try {
            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso!';
            this._limpaForm();
        } catch (erro) {
            console.log(erro);
            if (erro instanceof DataInvalidaException) {
                this._mensagem.texto = erro.message;
            } else {
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com a equipe de suporte.'
            }
        }

    }

    importaNegociacoes() {
        const negociacoes = [];

        this._service.obterNegociacoesDaSemana()
            .then(semana => {
                negociacoes.push(...semana);
                return this._service.obterNegociacoesDaSemanaAnterior();
            })
            .then(anterior => {
                negociacoes.push(...anterior);
                return this._service.obterNegociacoesDaSemanaRetrasada();
            })
            .then(retrasada => {
                negociacoes.push(...retrasada);
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso!'
            })
            .catch(err => this._mensagem.texto = err);
    }

    _criaNegociacao() {
        return new Negociacao(DateConverter.paraData(this._data.value), parseInt(this._quantidade.value), parseFloat(this._valor.value));
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
    }

}
