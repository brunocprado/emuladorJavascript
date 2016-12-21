//TODO : display PC

var SIMULADOR = function() {
    this.LIGADO = true;
    this.FLAGS = {
        "N" : false,
        "Z" : false,
        "C" : false
    };
    this.REGISTRADORES = {
        "PC": 0,
        "a" : 0,
        "b" : 0,
        "c" : 0,
        "d" : 0,
        "x" : 0
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
                this.REGISTRADORES[partes[1]] = parseInt(valor);
                imprime("Registrador " + partes[1].toUpperCase() + " carregou o valor " + valor);
                break;
                
            //REGISTRA    
            case "str" :
                instrucoes[partes[2]] = this.REGISTRADORES[partes[1]];
                imprime("Valor do registrador " + partes[1].toUpperCase() + " (" + this.REGISTRADORES[partes[1]] + ") enviado para o endereço " + partes[2]);
                break;
                
            //ADICIONA    
            case "add" :
                var valor = 0;
                if(partes[2].indexOf("#") == 0){
                    valor = partes[2].substr(1,partes[2].length-1);
                } else {
                    valor = instrucoes[partes[2]];
                }
                this.REGISTRADORES[partes[1]] += parseInt(valor);
                imprime("Valor do registrador " + partes[1].toUpperCase() + " += " + partes[2] + " (" + this.REGISTRADORES[partes[1]] + ")");
                break;
                
            //SUBTRAI    
            case "sub" :
                var valor = 0;
                if(partes[2].indexOf("#") == 0){
                    valor = partes[2].substr(1,partes[2].length-1);
                } else {
                    valor = instrucoes[partes[2]];
                }
                this.REGISTRADORES[partes[1]] -= parseInt(valor);
                imprime("Valor do registrador " + partes[1].toUpperCase() + " -= " + partes[2] + " (" + this.REGISTRADORES[partes[1]] + ")");
                break;
                
            //NEGATIVO    
            case "neg" :
                this.REGISTRADORES[partes[1]] = 0 - this.REGISTRADORES[partes[1]];
                imprime("Sinal do registrador " + partes[1].toUpperCase() + " invertido (" + this.REGISTRADORES[partes[1]] + ")");
                break;    
                
            //SHIFT RIGHT    
            case "shr" :
                this.REGISTRADORES[partes[1]] >>= 1;
                imprime("Valor do registrador " + partes[1].toUpperCase() + " deslocado para direita (" + this.REGISTRADORES[partes[1]] + ")");
                break;
                
            //ENCERRA    
            case "hlt" :
                this.LIGADO = false;
                imprime("<span style='color: #ce4949;'>HLT encontrado. Processamento encerrado</span>");
                break;
        }
        this.REGISTRADORES.PC += 1;
    }
};

function imprime(texto) {
    $("#console").append(texto + "<br>");
    console.log(texto);
}