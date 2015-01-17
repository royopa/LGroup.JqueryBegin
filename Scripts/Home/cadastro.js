function onCadastrarClick() {
    limparAlerta();
    limparMensagem();
    if (validaCadastro()) {

    }
}

function validaCadastro() {
    // Por boa prática, coloca-se na frente da variável
    // que está armazenando um objeto jQuery o '$'
    //debugger;
    var $txtNome    = $('#txtNome');
    var $txtEmail   = $('#txtEmail');
    var $txtCep     = $('#txtCep');
    
    var txtEndereco = $('#txtEndereco').val();
    var txtBairro   = $('#txtBairro').val();
    var txtNumero   = $('#txtNumero').val();
    var txtEstado   = $('#txtEstado').val();
    var txtCidade   = $('#txtCidade').val();
    var ckbAtivo    = $('#ckbAtivo').val();
    
    var isValido    = true;

    if ($txtNome.val().trim() === '') {
        isValido = false;
        $txtNome.addClass('errorInput');
    }

    if ($txtEmail.val().trim() === '') {
        isValido = false;
        $txtEmail.addClass('errorInput');
    }

    if ($txtCep.val().trim() === '') {
        isValido = false;
        $txtCep.addClass('errorInput');
    }

    if (txtNumero.trim() === '') {
        isValido = false;
        $('#txtNumero').addClass('errorInput');
    }

    if (!isValido) {
        var mensagem = '<strong>Atenção: </strong> Por favor, preencha os campos destacados abaixo.';
        showMensagem(mensagem);
    }

    return isValido;
}

function showMensagem(mensagem) {
    // Para selecionar um elemento da página através de sua classe
    // utiliza-se '.' na frente do nome da classe
    $('.divMensagemClass')
        .html(mensagem)
        .addClass('alert-danger')
        .addClass('alert');    
}

function limparAlerta() {
    $('#txtNome').removeClass('errorInput');
    $('#txtEmail').removeClass('errorInput');
    $('#txtCep').removeClass('errorInput');
    $('#txtNumero').removeClass('errorInput');
}

function limparMensagem() {
    $('.divMensagemClass')
        .removeClass('alert-danger')
        .removeClass('alert')
        .html('');
}

function onGetEnderecoPorCepBlur() {
    // o this está sendo representado pelo elemento javascript que sofreu o onBlur
    // ou seja o txtCep
    var cep = $(this).val();
    ajaxGetEndereco(cep);
}

function ajaxGetEndereco(cep) {
    // representação de objeto
    // {} = é um objeto json em javascript
    // em objetos os valores são atribuidos por dois pontos e não igual/tipo json
    $.ajax({
        url: 'http://api.postmon.com.br/v1/cep/' + cep, // URL da API que iremos consumir
        dataType: "JSON", // Tipo esperado
        // se a requisição é assíncrona ou não
        async: true,
        // Sucesso é a função que é acionada quando a requisição for
        // realizada com sucesso (callback)
        success: function(data) {
            preencheEndereco(data);
        },
        // erro é uma função acionada quando a requisição dá errado
        error: function(jqXHR, textStatus, errorThrown) {
            var mensagem = '<strong>Erro: </strong>' +
                'O Cep informado não foi encontrado.' +
                ' Por favor, informe um Cep válido.';
            showMensagem(mensagem);
        },
        // Função executada antes do envio da requisição
        beforeSend: function(xhr) {

        },
        //
        

    })
}

function preencheEndereco(data) {
    $('#txtEndereco').val(data.logradouro);
    $('#txtBairro').val(data.bairro);
    $('#txtEstado').val(data.estado);
    $('#txtCidade').val(data.cidade);
}
