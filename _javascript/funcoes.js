/* Bissecção */

function ajeitaEquacao(_s) {
    if (_s.indexOf("^") > -1)
    {
        var tab = [];
        var powfunc="Math.pow";
        var joker = "___joker___";
        while (_s.indexOf("(") > -1) {
            _s = _s.replace(/(\([^\(\)]*\))/g, function(m, t) {
                tab.push(t);
                return (joker + (tab.length - 1));
            });
        }

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\w*)\^(\w*)/g, powfunc+"($1,$2)"); //haha
            });
        }
    }

    if (_s.indexOf("sen") > -1)
    {
        var tab = [];
        var sinfunc="Math.sin";
        var joker = "___joker___";

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\bsen\b)\((\w+)\)/g, sinfunc+"($2)");
            });
            // oq sai aqui, já sai prontoo
        }
    }

    if (_s.indexOf("cos") > -1)
    {
        var tab = [];
        var cosfunc="Math.cos";
        var joker = "___joker___";

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\bcos\b)\((\w+)\)/g, cosfunc+"($2)");
            });
        }
    }

    if (_s.indexOf("tan") > -1)
    {
        var tab = [];
        var tanfunc="Math.tan";
        var joker = "___joker___";

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\btan\b)\((\w+)\)/g, tanfunc+"($2)");
            });
        }
    }

    if (_s.indexOf("log") > -1)
    {
        var tab = [];
        var logfunc="Math.log";
        var joker = "___joker___";

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\blog\b)\((\w+)\)/g, logfunc+"($2)");
            });
        }
    }

    if (_s.indexOf("exp") > -1)
    {
        var tab = [];
        var expfunc="Math.exp";
        var joker = "___joker___";

        tab.push(_s);
        _s = joker + (tab.length - 1);
        while (_s.indexOf(joker) > -1)
        {
            _s = _s.replace(new RegExp(joker + "(\\d+)", "g"), function(m, d) {
                return tab[d].replace(/(\bexp\b)\((\w+)\)/g, expfunc+"($2)"); // vai ser parecida com a pow
            });
        }
    }


    return _s;
}

var EQUACAO;

function Escolha()
{
    var x = document.getElementById("mySelect").value;
    document.getElementById("escolhaEquacao").innerHTML = "Sua escolha: " + x;

    if(x=="Bisseccao"){
        return 1;
    }
    if(x=="Falsa posição"){
        return 2;
    }
    if(x=="Newton-Raphson"){
        return 3;
    }
    if(x=="Secante"){
        return 4;
    }
    if(x=="Ponto fixo"){
        return 5;
    }
}

function calcula(x) {
    valor = eval(EQUACAO);
    return valor
}

function arredonda(x) {
    valor = Math.floor(10000000 * x)/10000000;
    return valor
}

function veficarIntervalo(aForm)
{
    a = eval(aForm.raizVerifEsq.value);
    b = eval(aForm.raizVerifDir.value);
    aa = parseFloat(a);
    bb = parseFloat(b);
    EQUACAO = document.getElementById('textAreaEquaVerif').value;
    EQUACAO = ajeitaEquacao(EQUACAO);

    fa = arredonda(calcula(aa));
    fb = arredonda(calcula(bb));

    div = document.getElementById("escreveVerif");

    if ((a == null) || (b == null) || (EQUACAO == ""))
    {
        alert("É preciso preencher todos os campos!");
    }
    else
    {
        if((arredonda(calcula(aa)) * arredonda(calcula(bb))) < 0)
        {
            return div.innerHTML = "<h3 style='text-align: justify': center'>f("+a+") = "+fa+"<br>"+"f("+b+") = "+fb+"<br><font color='green'>f("+a+") * f("+b+") < 0</h3>";
        }
        else
        {
            alert("O intervalo indicado não possui raiz.\nDica: f(a)*f(b) < 0");
            return div.innerHTML = "<h3 style='text-align: justify': center'>f("+a+") = "+fa+"<br>"+"f("+b+") = "+fb+"<br><font color='red'>f("+a+") * f("+b+") > 0</h3>";
        }
    }
}


function leitura(aForm, escolha)
{
    a = eval(aForm.raizEsq.value);
    b = eval(aForm.raizDir.value);
    aa = parseFloat(a);
    bb = parseFloat(b);
    erro = eval(aForm.preci.value);
    EQUACAO = document.getElementById('textAreaEqua').value;
    cop = EQUACAO;

    EQUACAO = ajeitaEquacao(EQUACAO);

    // Recuperando iframe
    var meuIframe = document.getElementById("frame-passos");
    var conteudoIframe = meuIframe.contentDocument || meuIframe.contentWindow.document;

    // Limpando iframe
    var html = "";
    //"<html><head><TITLE>Calculando a raiz</TITLE><script src='http://cdn.mathjax.org/mathjax/latest/MathJax.js' type='text/javascript'>MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});</script></head><body>Dados iniciais:<br>f(x) = "+cop+"<br>f("+aa+") = "+ arredonda(calcula(aa))+ "<br>f("+bb+") = "+ arredonda(calcula(bb))+"<br>E = "+erro+"<BR><br></body>"
    meuIframe.contentWindow.document.open();
    meuIframe.contentWindow.document.write(html);
    meuIframe.contentWindow.document.close();


    if (escolha == 1)
    {
        if ((a == null) || (b == null) || (erro == null) || (EQUACAO == ""))
        {
            alert("É preciso preencher todos os campos!");
        }
        else
        {
            if(EQUACAO.indexOf("x") > -1)
            {
                if ((arredonda(calcula(aa)) * arredonda(calcula(bb))) < 0)
                {
                    conteudoIframe.write("<p>Dados iniciais:<br>f(x) = "+cop+"<br>f("+aa+") = "+ arredonda(calcula(aa))+ "<br>f("+bb+") = "+ arredonda(calcula(bb))+"<br>E = "+erro+"<BR></p>");
                    conteudoIframe.write("Usando o método da bissecção:<br><br>Invervalo 1: ["+aa+","+bb+"]<br>");

                    var achou=false;
                    fa=calcula(aa);
                    fb=calcula(bb);
                    cont=2;

                    var fr;

                    if ((a!=null) && (b!=null) && (erro!=null))
                    {
                        while (!achou)
                        {
                            x=((aa+bb)/2);
                            er=((bb-aa)/2);
                            if (er<=erro) {
                                achou=true;
                                conteudoIframe.write("("+aa+"+"+bb+")/2 = "+x+"<br>");
                                conteudoIframe.write("Calculando f("+x+") = 0"+"<br><br>");
                            }else{
                                if (er>erro){
                                    fr=calcula(x);
                                    conteudoIframe.write("("+aa+"+"+bb+")/2 = "+x+"<br>");
                                    conteudoIframe.write("Calculando f("+x+") = "+arredonda(fr)+"<br><br>");
                                }
                                if (fr==0) {
                                    achou=true;
                                }else{
                                    if (fr<0){
                                        aa=x;
                                    }else{
                                        bb=x;
                                    }
                                }
                            }
                            if (!achou){
                                conteudoIframe.write("Intervalo "+cont+" :   ["+arredonda(aa)+";"+arredonda(bb)+"]<br>")

                                cont++;
                            }
                        }
                    }
                    if (achou){
                        conteudoIframe.write("Portanto,"+"<br><br>");
                        conteudoIframe.write("Intervalo final:   ["+aa+";"+bb+"]<br>");
                        conteudoIframe.write("Raiz:   "+arredonda(x)+" ± "+er)
                    }

                }
                else
                {
                    alert("O intervalo indicado não possui raiz.");
                }
            }
            else
            {
                alert("A equação deve possuir ao menos uma variável (ex: 'sen(x)').");
            }
        }
    }
}