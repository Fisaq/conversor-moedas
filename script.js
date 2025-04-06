//Requisição FXRatesAPI

let ACCESS_TOKEN = '';

//Implementação do Câmbio

const valorReal = document.getElementById('valor-real');
const valorDolar = document.getElementById('valor-dolar');

let tempoReal;
let tempoDolar;

// Debounce serve para evitar chamadas desnecessárias enquanto o usuário ainda está digitando.
function debounce(callback, delay, tempoVar){
    clearTimeout(tempoVar);
    return setTimeout(callback, delay);
}

valorReal.addEventListener('input', () => {

    tempoReal = debounce(() =>{
        const valorInputadoReal = valorReal.value;

        if (valorInputadoReal !== "" && !isNaN(valorInputadoReal)){
            fetch(`https://api.fxratesapi.com/convert?from=BRL&to=USD&amount=${valorInputadoReal}&format=json&api_key=${ACCESS_TOKEN}`)
            .then(resposta => resposta.json())
            .then(dados => {
                console.log('Valor convertido:',dados);
                valorDolar.value = `USD ${dados.result.toFixed(2)}`;
            })
            .catch(erro => {
                console.error('Erro ao converter: ', erro)
            });
        }else{
            valorDolar.value = '';
        }
    }, 50, tempoReal); //Delay de 5ms para exibir o resultado
});

valorDolar.addEventListener('input', () => {

    tempoDolar = debounce(() =>{
        const valorInputadoDolar = valorDolar.value;

        if(valorInputadoDolar !== "" && !isNaN(valorInputadoDolar)){
            fetch(`https://api.fxratesapi.com/convert?from=USD&to=BRL&amount=${valorInputadoDolar}&format=json&api_key=${ACCESS_TOKEN}`)
            .then(resposta => resposta.json())
            .then(dados => {
                console.log('Valor convertido:',dados);
                valorReal.value = `R$ ${dados.result.toFixed(2)}`;
            })
            .catch(erro => {
                console.error('Erro ao converter: ', erro)
            });
        } else{
            valorReal.value = '';
        }
    }, 50, tempoDolar);  
});

