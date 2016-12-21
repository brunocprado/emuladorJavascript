var MIPS = function() {
    this.LIGADO = true;
    this.FLAGS = {
        "N" : false,
        "Z" : false,
        "C" : false
    };
    this.PC = 0;
    this.REGISTRADORES = [];
    this.REGISTRADORES[32] = 0;
    
    this.compila = function() {
        var compilado = new Object();
        var tmp = editor.getValue().split("\n");
        for(var i=0;i<tmp.length;i++){
            if(tmp[i].indexOf("/") == "0") continue;
            if(tmp[i] == "") continue;

            var linha = [];
            var inst = tmp[i].toLowerCase().trim();
            var p1 = inst.substr(0,inst.indexOf(" "));
            var p2 = inst.substr(inst.indexOf(" "),inst.length).split(",");
            linha.push(p1);
            for(var r=0;r<p2.length;r++){
                linha.push(p2[r].trim().substr(p2[r].trim().indexOf("$")+1,p2[r].trim().length));
            }
            
            compilado[i] = linha;
        }
        instrucoes = compilado;
        console.log(compilado);
    }
        
    this.inicia = function() {
       // while(this.LIGADO && this.REGISTRADORES.PC < 2){
            this.executa(instrucoes[this.PC]);    
       // }
        console.log(this.REGISTRADORES);
    }
    
    this.executa = function(instrucao) {
        if(instrucao == null) return;
        console.log("1");
        switch(instrucao[0]){
            case "add":
                this.REGISTRADORES[instrucao[1]] = this.REGISTRADORES[instrucao[2]] + this.REGISTRADORES[instrucao[3]];
                break;
                
            case "addi":
                this.REGISTRADORES[instrucao[1]] = this.REGISTRADORES[instrucao[2]] + parseInt(instrucao[3]);
                break;
        }
        
//        switch
    
        
        
        this.PC ++;
    }
};

function traduzRegistrador(registrador){
    if(registrador == "$zero") return 32;
}