const form = document.getElementById("form_gerador");
form.addEventListener("submit", function(event){
    event.preventDefault();

    const quantidadeInput = document.getElementById("quantidade");

    const valorDigitado = quantidadeInput.value.trim();

    if(valorDigitado ==="" || isNaN(valorDigitado) || valorDigitado < 1){
        alert("Por Favor, informe uma quantidade válida (minimo 1).");
        return
    }
    const quantidade = parseInt(valorDigitado, 10)

    const numeros = gerarNumerosAleatorios(quantidade);
    const estatisticas = analisarNumero(numeros);
    exibirResultados(numeros, estatisticas);
});

function gerarNumerosAleatorios(quantidade){
    const numeros = [];

    for(let i = 0; i < quantidade; i++){
        const numero = Math.floor(Math.random()*100) + 1;
        numeros.push(numero);
    }
    return numeros;
}

function analisarNumero(numeros){
    const total = numeros.reduce((acc, num)=>acc + num, 0);
    const media = (total / numeros.length).toFixed(2);
    const maior = Math.max(...numeros);
    const menor = Math.min(...numeros);

    let pares = 0;
    let impares = 0;

    numeros.forEach(numero =>{
        if(numero % 2 == 0){
            pares++;
        }else{
            impares++;
        }
    });
    return {media, maior, menor, pares, impares};
}

function exibirResultados(numeros, estatisticas) {
    const resultadoDiv = document.getElementById('resultado');

       
    resultadoDiv.innerHTML = `
    <p><strong>Números gerados:</strong> ${numeros.join(', ')}</p>
        <ul>
            <li><strong>Média:</strong> ${estatisticas.media}</li>
            <li><strong>Maior número:</strong> ${estatisticas.maior}</li>
            <li><strong>Menor número:</strong> ${estatisticas.menor}</li>
            <li><strong>Pares:</strong> ${estatisticas.pares}</li>
            <li><strong>Ímpares:</strong> ${estatisticas.impares}</li>
        </ul>
    `;

    resultadoDiv.classList.remove('mostrar');

    setTimeout(()=>{
        resultadoDiv.classList.add('mostrar');
    }, 10);
}