var campoEncriptado;
var campoTexto;
const imagemTema = document.querySelector('.divImgBoneco');

const alfabeto="abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//const tamCifraMinima=27;
//const enter="ZZenterr";
const espaco="ZZespaco";

var  cifra1="XwYqQp47aQpfglTorijHkdjBKXwYqQp"; 
var  cifra2 ="XwYqQpjHkdjBKHjoehlhoaXwYqQp";




function variarCifras(){

var chaveAleatoria="";

   
    for(var i=0;i<15;i++)
    {
        chaveAleatoria+=alfabeto[Math.floor(Math.random() * (alfabeto.length))];

    }

return chaveAleatoria;
}


function unicodeParaTexto(char){    //código adaptado de https://stackoverflow.com/questions/7063255/how-can-i-convert-a-string-into-a-unicode-character 

return eval("'" + char + "'");
}  


//entradaTexto.value=unicodeParaTexto("\u00f7");
//entradaTexto.value+="---->>>" + toUnicode2(str);

function toUnicode(str) {       // código adaptado de https://gist.github.com/littlee/f726f61b1e0abd319da4
    return str.split('').map(function (value, index, array) {
        var temp = value.charCodeAt(0).toString(16).toUpperCase();
        if (temp.length == 2) {
            return "00"+ temp;
        }

        if (temp.length == 3) {
            return "0"+ temp;
        }

        if (temp.length == 1) {
            return "000"+ temp;
        }
        return temp;
    }).join('');
}




function embaralharTextoBinario(textoBinario){
var textoEncriptado="";

    for (var i = 0; i < textoBinario.length;) {            
         textoEncriptado+=textoBinario[textoBinario.length-i-1];

        i++;
     }

campoEncriptado="";


    
campoEncriptado+=variarCifras();

     

    for (var i = 0; i < textoEncriptado.length; i++) {


        if( parseInt(textoEncriptado[i].charCodeAt(0))==48){
        campoEncriptado+=cifra1;
       
        //alert("AQUI 48 + " + cifra1);
         continue;
        }
        
        if(parseInt(textoEncriptado[i].charCodeAt(0))==49){
        campoEncriptado+=cifra2;
        
       // alert("Aqui 49 + " + cifra2);
         continue;
        }

        else{campoEncriptado+=textoEncriptado[i];

             //   alert("Aqui Resto + " + textoEncriptado[i]);
        }

       
    }


}

function ocultarmensagens(){
    document.querySelector('.msgCopiado').style.display  = 'none';
    if(!(entradaTexto.value.length==0)){

    
    imagemTema.style.display = 'none';
    document.querySelector('.textoAbaixoBoneco').style.display = 'none';
    document.querySelector('.textoAbaixoBoneco2').style.display = 'none';
   
    }
    else{
        campoResultado.value="";
        imagemTema.style.display = 'initial';
        document.querySelector('.textoAbaixoBoneco').style.display = 'initial';
        document.querySelector('.textoAbaixoBoneco2').style.display = 'initial';
    }

}

function encriptarTexto()
{

   
    if(entradaTexto.value==""){return;}
    else{
    document.querySelector('.btn-copy').style.display = 'initial';
    imagemTema.style.display = 'none';
    document.querySelector('.msgCopiado').style.display  = 'none';
    document.querySelector('.textoAbaixoBoneco').style.display = 'none';
    document.querySelector('.textoAbaixoBoneco2').style.display = 'none';
  
    }

if(entradaTexto.value.length==0)
    return;


var textoTemporario="";

textoTemporario = entradaTexto.value;
entradaTexto.value="";
campoTexto="";
campoResultado.value="";


for (var i = 0; i < textoTemporario.length; i++) {

var retornoEmUnicode;

retornoEmUnicode=toUnicode(textoTemporario[i]);
//alert(retornoEmUnicode);

    for(var t=0;t<retornoEmUnicode.length;t++) 
    campoTexto+=retornoEmUnicode[t];        
    
}
  
textoTemporario="";

    for (var i = 0; i <campoTexto.length; i++) {
      textoTemporario += campoTexto[i]; //.charCodeAt(0).toString(2) + " ";
     
     }


embaralharTextoBinario(textoTemporario);
//campoResultado.value="";
    for (var i = 0; i <campoEncriptado.length; i++) {
      campoResultado.value+= campoEncriptado[i]; //.charCodeAt(0).toString(2) + " ";
     
     }
        //alert(campoResultado.value);
}


function desencriptarTexto(binary) 
{
    document.querySelector('.btn-copy').style.display = 'none';
    document.querySelector('.msgCopiado').style.display  = 'none';
    

var caracter="";

campoEncriptado="";       // limpa para receber novo texto

var chave1 = cifra1; // 0
var chave2 = cifra2; // 1
var contadorChave1=0;
var contadorChave2=0;



 var    textTemporario2;


textTemporario2=entradaTexto.value;
entradaTexto.value="";
campoEncriptado="";


    for(var i = 0; i < textTemporario2.length; i++ )
    {
        if(contadorChave1>chave1.length){contadorChave1==0;}
        if(contadorChave2>chave2.length){contadorChave2==0;}

        if(textTemporario2[i]==chave1[contadorChave1] || textTemporario2[i]==chave2[contadorChave2])
        {

            if(textTemporario2[i]==chave1[contadorChave1])
            contadorChave1++;

            if(textTemporario2[i]==chave2[contadorChave2])
            contadorChave2++;

            if(contadorChave1==chave1.length){
                campoEncriptado+="0";
                contadorChave1=0;
                contadorChave2=0;
                 
                continue;  // continue para contagem chave
            }

            if(contadorChave2==chave2.length){
            campoEncriptado+="1";
            contadorChave1=0;
            contadorChave2=0;
            
            continue;  // continue para contagem chave
           }
           
        continue;
      
        }

       campoEncriptado+=textTemporario2[i];
      
    }     
 
     entradaTexto.value="";
     textTemporario2="";
     campoResultado.value="";

     var t=0;
      for(var i=0;i<campoEncriptado.length; i++)    
     {

                    
            textTemporario2+=campoEncriptado[campoEncriptado.length-i-1];
 
            if(t==3){
                
               campoResultado.value+=unicodeParaTexto("\\u"+textTemporario2);
               textTemporario2="";
               t=0;
               continue;
            }
        t++;
       
     }


}//desencriptar fim


function copiarTexto() {

  
    navigator.clipboard.writeText(campoResultado.value);
    document.querySelector('.btn-copy').style.display = 'none';
    document.querySelector('.msgCopiado').style.display  = 'initial';

    setTimeout(function(){   ocultarmensagens();  
    },3000);

    
    
  }

  

  



