var RAMSES = function() {
    this.LIGADO = true;
    this.FLAGS = {
        "N" : true,
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
        
    this.compila = function() {
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
    
    this.inicia = function() {
        while(this.LIGADO && this.REGISTRADORES.PC < 256){
            this.executa(instrucoes[this.REGISTRADORES.PC]);    
        }
        console.log(this.REGISTRADORES);
    }
    
    this.executa = function(instrucao) {
        if(instrucao == null) { this.REGISTRADORES.PC ++; return; }
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
                
            //JUMP    
            case "jmp" :
                this.REGISTRADORES.PC = parseInt(partes[1]) - 2;
                imprime("Apontador de programa alterado para a posição " + partes[1]);
                break; 
                
            //JUMP CASO NEGATIVO  
            case "jn" :
                if(this.FLAGS.N) {
                    this.REGISTRADORES.PC = parseInt(partes[1]) - 2;
                    imprime("Apontador de programa alterado para a posição " + partes[1]);
                    this.FLAGS.N = false;
                }
                break;  
                
            //JUMP CASO ZERO    
            case "jz" :
                if(this.FLAGS.Z) {
                    this.REGISTRADORES.PC = parseInt(partes[1]) - 2;
                    imprime("Apontador de programa alterado para a posição " + partes[1]);
                    this.FLAGS.N = false;
                }
                break;  
            
            //JUMP CASO CARRY   
            case "jc" :
                if(this.FLAGS.C) {
                    this.REGISTRADORES.PC = parseInt(partes[1]) - 2;
                    imprime("Apontador de programa alterado para a posição " + partes[1]);
                    this.FLAGS.N = false;
                }
                break;  
                
            //NOT    
            case "not" :
                this.REGISTRADORES[partes[1]] = !this.REGISTRADORES[partes[1]];
                imprime("Sinal do registrador " + partes[1].toUpperCase() + " invertido (" + this.REGISTRADORES[partes[1]] + ")");
                break;       
                
            //NEGATIVO    
            case "neg" :
                this.REGISTRADORES[partes[1]] *= -1;
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
                imprime("<span style='color: #ce4949;'>HLT encontrado. Processamento encerrado</span><br>");
                break;
        }
        this.REGISTRADORES.PC += 1;
    }
};

function imprime(texto) {
    var elemento = document.getElementById("console");
    elemento.innerHTML += texto + "<br>";  
    elemento.scrollTop = elemento.scrollHeight;
    console.log(texto);
}    