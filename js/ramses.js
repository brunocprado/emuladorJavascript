var RAMSES = function() {
    this.LIGADO = true;
    this.FLAGS = {
        "N" : false,
        "Z" : false,
        "C" : false
    };
    this.REGISTRADORES = {
        "PC": 0,
        "a" : null,
        "b" : null,
        "c" : null,
        "d" : null,
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
        while(this.LIGADO){
            if(Number.isInteger(parseInt(this.REGISTRADORES.PC)) && this.REGISTRADORES.PC > 255) { this.LIGADO = false; return; }
            this.executa(instrucoes[this.REGISTRADORES.PC]);    
        }
        console.log(this);
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
                this.JUMP(partes[1]);    
                return;
                imprime("Apontador de programa alterado para a posição " + partes[1]);
                break; 
                
            //JUMP CASO NEGATIVO  
            case "jn" :
                if(this.FLAGS.N) {
                    this.JUMP(partes[1]);
                    imprime("Apontador de programa alterado para a posição " + partes[1]);
                    this.FLAGS.N = false;
                }
                break;  
                
            //JUMP CASO ZERO    
            case "jz" :
                if(this.FLAGS.Z) {
                    this.JUMP(partes[1]);
                    return;
                    imprime("Apontador de programa alterado para a posição " + partes[1]);
                    this.FLAGS.N = false;
                }
                break;  
            
            //JUMP CASO CARRY   
            case "jc" :
                if(this.FLAGS.C) {
                    this.JUMP(partes[1]);    
                    return;
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
        
        //====| CHECA FLAGS |====//              
        this.FLAGS.N = (this.REGISTRADORES.a < 0 || this.REGISTRADORES.b < 0 || this.REGISTRADORES.c < 0);
        this.FLAGS.Z = (this.REGISTRADORES.a == 0 || this.REGISTRADORES.b == 0 || this.REGISTRADORES.c == 0);
        //TODO: VERIFICAR CARRY nas operacoes ADD,SUB,NEG e SHR
        
        
        //====| MUDA DISPLAY |====//
        $("#radioN").attr("checked",this.FLAGS.N);
        $("#radioZ").attr("checked",this.FLAGS.Z);
        
        this.REGISTRADORES.PC += 1;
    }
    
    this.JUMP = function(inst){
        if(Number.isInteger(parseInt(inst))){
            this.REGISTRADORES.PC = parseInt(inst) - 1;
        } else {
            this.REGISTRADORES.PC = inst;
        }
    }
    
};

function imprime(texto) {
    var elemento = document.getElementById("log");
    elemento.innerHTML += texto + "<br>";  
    elemento.scrollTop = elemento.scrollHeight;
    console.log(texto);
}    