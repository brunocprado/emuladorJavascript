//TODO : display PC

var SIMULADOR = function() {
    this.LIGADO = true;
    this.FLAGS = {
        "N" : false,
        "Z" : false,
        "C" : false
    }
    this.REGISTRADORES = {
        "PC": 0,
        "a" : null,
        "b" : null,
        "c" : null,
        "d" : null,
        "x" : null
    };
        
    this.proximaInstrucao = function() {
        while(this.LIGADO){
            this.executa(instrucoes[this.REGISTRADORES.PC]);
        }
    }
    
    this.executa = function(instrucao) {
        var inst = instrucao.toLowerCase();
        var partes = inst.split(" ");
        switch(partes[0]){
            //CARREGA
            case "ldr" :
                var valor = 0;
                if(partes[2].indexOf("#") == 0) {
                    valor = partes[2].substr(1,partes[2].length-1);
                } else {
                    valor = instrucoes[partes[2]];
                }
                this.REGISTRADORES[partes[1]] = valor;
                imprime("Registrador " + partes[1].toUpperCase() + " carregou o valor " + valor);
                break;
                
            //REGISTRA    
            case "str" :
                instrucoes[partes[2]] = this.REGISTRADORES[partes[1]];
                imprime("Valor do registrador " + partes[1].toUpperCase() + " (" + this.REGISTRADORES[partes[1]] + ") enviada para endereço " + partes[2]);
                break;
                
            //ENCERRA    
            case "hlt" :
                this.LIGADO = false;
                imprime("HLT encontrado. Processamento encerrado");
                break;
        }
        this.REGISTRADORES.PC += 1;
    }
};

function imprime(texto) {
    $("#console").append(texto + "<br>");
    console.log(texto);
}