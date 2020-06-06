function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
   .then( (res) => { return res.json() })
   .then( states => {
     
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }    
    })    
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
   .then( (res) => { return res.json() })
   .then( cities => {  
       
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })  
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

  //Itens de Coleta
  const itemsToCollect = document.querySelectorAll(".items-grid li");

  for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
  }

  // Variável para atualizar o campo escondido com os itens selecionados
  const collectedItems = document.querySelector("input[name=items]")

  let selectedItems =[]

  function handleSelectedItem(event) {
    const itemLi = event.target
    // Add ou remover uma classe
    itemLi.classList.toggle('selected')
    const itemId = itemLi.dataset.id

    //console.log('item id: ', itemId) //////////////////////

    // Verificar se existem itens selecionados, se sim pegar os itens
    const alreadySelected = selectedItems.findIndex( function(item) {
      const itemFound = item === itemId
      return itemFound
    });

    // Se já estiver selecionado tirar seleção
    if(alreadySelected >= 0) {
      // tirar da posição
      const filterItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })
      selectedItems = filterItems
    } else {
      // Se não estiver selecionado, adicionar a selecão
      selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems) //////////////////

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems



  }