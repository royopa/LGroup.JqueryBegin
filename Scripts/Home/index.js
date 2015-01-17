// é a função do jQuery que executa o código dentro dela após a página
// ser carregada.
$(document).ready(function () {
    // Palavra reservada do javascript para quando se tiver com o F12 
    // pressionado, para nessa parte
    //debugger;
    // No JQuery para selecionar um elemento da página através
    // do ID, coloca-se na frente o '#'
    var lblAno = $('#lblAno');
    lblAno.text(new Date().getFullYear());

    // aqui estamos atribuindo no elemento de id txtCep, no evento blur dele
    // a função onGetEnderecoPorCepBlur é executada
    // o blur é um evento acionado quando o elemento perde o foco
    $('#txtCep').blur(onGetEnderecoPorCepBlur);         
});
