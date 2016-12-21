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

var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: "material",
    mode: "ramses"
});

editor.focus();

function inicia() {
    simulador = new RAMSES();
    simulador.compila();
    simulador.inicia();
    
    //document.getElementById("console").innerHTML = "";
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