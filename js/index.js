var simulador;
var instrucoes = "";

var editor = CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    theme: "material"
});

function compila() {
    instrucoes = editor.getValue().split("\n");
}

function inicia() {
    simulador = new SIMULADOR();
    compila();
    setInterval(function(){
        simulador.proximaInstrucao();
    },500);
}

$("#btnIniciar").click(function(e){
    inicia();
});

$("#btnMenu").click(function(e){
    var tmp = $("#menu");
    if(tmp.css("width") == "0px") {
        tmp.css("width","400px");
    } else {
        tmp.css("width","0px");
    }
});