const fs = require('fs');
const { DOMParser } = require('xmldom');
const R = require('ramda');

const { isValid2, isValid, elementsToArray, getGitHubProjectInfos } = require('./xmlfilter');

// efetua o processamento do xml e armazena a estrutura no objeto 'document'
const document = new DOMParser().parseFromString(fs.readFileSync('res/f-droid.xml', 'utf-8'));

const isAddedAfter2000AndUpdatedIn2020 = isValid2(R.__, 2000, 2020);


const addedApps = elementsToArray(document.getElementsByTagName('application'))
    .filter(isAddedAfter2000AndUpdatedIn2020)
    .map(getGitHubProjectInfos);

console.log(addedApps.join('\n'));
 

// (Exercício 5) Crie um novo arquivo main2.js (baseado no main.js) que seleciona todos as apps adicionadas
// depois do ano 2000 e atualizadas em 2020. Ao imprimir as apps, além do nome, imprima
// a data que foi adicionada e a data da última atualização.
