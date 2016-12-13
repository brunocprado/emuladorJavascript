//Botão de rodar + display PC

var SIMULADOR = function() {
    this.N = false;
    this.Z = false;
    this.REGISTRADORES = {
        "PC": 0,
        "a" : null,
        "b" : null,
        "c" : null,
        "d" : null,
        "x" : null
    };
        
    this.proximaInstrucao = function() {
        this.executa(instrucoes[this.REGISTRADORES.PC]);
    }
    
    this.executa = function(instrucao) {
        var inst = instrucao.toLowerCase();
        var partes = inst.split(" ");
        switch(partes[0]){
            case "ldr" :
                this.REGISTRADORES[partes[1]] = partes[2];
                imprime("Registrador " + partes[1].toUpperCase() + " carregou o valor " + partes[2]);
                break;
        }
        this.REGISTRADORES.PC += 1;
    }
};

function imprime(texto) {
    $("#console").append(texto + "<br>");
    console.log(texto);
}