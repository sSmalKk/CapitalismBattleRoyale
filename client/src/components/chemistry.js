const axios = require('axios');

// Função para buscar e contextualizar os dados do composto
async function getCompoundSynonyms(compoundName) {
  try {
    const response = await axios.get(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compoundName}/synonyms/JSON`
    );
    const compoundInfo = response.data.InformationList.Information[0];
    
    console.log(`CID: ${compoundInfo.CID}`);
    console.log("Sinônimos: ");
    
    compoundInfo.Synonym.forEach((synonym, index) => {
      console.log(`${index + 1}. ${synonym}`);
    });

  } catch (error) {
    console.error("Erro ao buscar sinônimos:", error);
  }
}

// Exemplo de uso com o composto 'water'
getCompoundSynonyms('water');
