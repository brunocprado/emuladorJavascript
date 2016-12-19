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

// TODO 
// SELETOR de HZ
// GERAR BYTECODE

var editor = CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    theme: "material",
    mode: "ramses"
});

editor.focus();

function compila() {
    var compilado = new Object();
    var tmp = editor.getValue().split("\n");
    for(var i=0;i<tmp.length;i++){
        if(tmp[i].indexOf("/") == "0") continue;
        if(tmp[i] == "") continue;
        
        var temp = tmp[i].indexOf(":");
        if(temp > 0) {
            var dado = tmp[i].substr(temp + 1,tmp[i].lenght).trim();
            compilado[tmp[i].substr(0,tmp[i].indexOf(":"))] = dado;
            continue;
        }
        compilado[i] = tmp[i];
    }
    instrucoes = compilado;
    console.log(compilado);
}

function inicia() {
    simulador = new SIMULADOR();
    compila();
    
    setInterval(function(){
        simulador.proximaInstrucao();
    },200);
    
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
    if(tmp.css("margin-left") == "-320px") {
        tmp.css("margin-left","0px");
    } else {
        tmp.css("margin-left","-320px");
    }
});

$("body").on('keydown', function(e) {
    if (e.which != 13) return;
    return;
    var linhas = editor.getValue().split("\n"); 
    var pos = editor.getCursor();
    var texto = linhas[pos.line - 1].toLowerCase();
    var partes = texto.split(" ");
    var comentario = "";
    
    switch(partes[0]){
        case "ldr":
            comentario = "Registrador " + partes[1].toUpperCase() + " carrega o valor ";
            if(partes[2].indexOf("#") == 0) { comentario += partes[2].substr(1,partes[2].length - 1);} else {
                comentario += "contido no endereço " + partes[2];
            }
            break;
        case "hlt":
            comentario = "Encerra programa";
            break;
    }
    
    if(comentario != "" && texto.indexOf("//") == -1 && linhas[pos.line - 1] != "") { linhas[pos.line - 1] += " // " + comentario; }
    editor.setValue(linhas.join("\n"));
    editor.setCursor(pos);
});
