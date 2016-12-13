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
    
    $("#console").html("");
    $("#console").animate({"height":"200px"},500);
    $("#console").css("display","block");
    $("#btnIniciar").css("bottom","220px");
}

$("#btnIniciar").click(function(e){
    if(editor.getValue() == "") { alert("Insira o código"); return; }
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