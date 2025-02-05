function Procurar(){
let pais = document.getElementById('pais').value
// determinar o site como uma variavel conforme a busca que vamos realizar
let finalurl = `https://restcountries.com/v3.1/name/${pais}?fullText=true`
console.log(finalurl)
// o fetch é o comando que vai retirar as informações da api
fetch (finalurl)
//o then  e o comando que vai permitir que nos trabalhemos com esses dados
.then(function(response){
    return response.json()
})

//aqui estou puxando os dados de caa um dos itens depois do ponto
.then(function(data){
    console.log(data[0])
    console.log(data[0].population)
    console.log(data[0].capital[0])
    console.log(data[0].continents[0])

    let bandeira = document.getElementById('bandeira')
    let nome = document.getElementById('nome')
    let capital= document.getElementById('capital')
    let pop = document.getElementById('pop')
    let cont = document.getElementById('cont')

    nome.innerHTML =pais
    capital.innerHTML = data[0].capital[0]
    pop.innerHTML = data[0].population
    cont.innerHTML = data[0].continents[0]
    bandeira .src = data[0].flags.svg
})
}