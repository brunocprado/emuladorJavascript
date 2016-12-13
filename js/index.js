var simulador;
var instrucoes = "";

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var editor = CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    theme: "material",
    mode: "ramses"
});

function compila() {
    var tmp = editor.getValue().split("\n");
    for(var i=0;i<tmp.length;i++){
        if(tmp[i].indexOf("/") == "0") tmp.remove(tmp[i]); //REMOVE COMENTÁRIOS
    }
    instrucoes = tmp;
    console.log(tmp);
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


