const R = require('ramda');

// (Exercício 1) - Declaração de função
// (Exercício 3) - Função curry
// (Exercício 4) - Função high-order
const contentOfTag = R.curry(
    (xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent
);

// (Exercício 1) - Declaração de função
const contentOfSource = contentOfTag(R.__, 'source');

// (Exercício 1) - Declaração de função
const contentOfAdded = contentOfTag(R.__, 'added');

// (Exercício 1) - Declaração de função
const contentOfUpdated = contentOfTag(R.__, 'lastupdated');

// (Exercício 1) - Declaração de função
const contentOfID = contentOfTag(R.__, 'id');

// (Exercício 1) - Declaração de função
const getGitHubProject = xmlNode => contentOfSource(xmlNode).replace('https://github.com/', '');

const getGitHubProjectInfos = xmlNode => (`GitHub: ${contentOfSource(xmlNode).replace('https://github.com/', '')} - Added: ${contentOfAdded(xmlNode)} - Updated: ${contentOfUpdated(xmlNode)}`);

// (Exercício 1) - Declaração de função
// (Exercício 2) - Função com side-effects, porque retorna um array com referencia aos itens da variavel nodes
const elementsToArray = nodes => {
    const arr = [];
    for (let i = 0; i < nodes.length; i++)
        arr.push(nodes[i]);
    return arr;
};

// (Exercício 1) - Declaração de função
// (Exercício 3) - Função curry
// (Exercício 4) - Função high-order
const isValid = R.curry(
    (app, addedAfterYear, updatedAfterYear) => {
        if (!contentOfSource(app).includes('github.com'))
            return false;

        const addedDate = new Date(contentOfAdded(app));
        if (addedDate.getFullYear() < addedAfterYear)
            return false;

        const lastUpdatedDate = new Date(contentOfUpdated(app));
        if (lastUpdatedDate.getFullYear() < updatedAfterYear)
            return false;

        return true;
    }
);

const isValid2 = R.curry(
    (app, addedAfterYear, updatedAfterYear) => {
        if (!contentOfSource(app).includes('github.com'))
            return false;

        const addedDate = new Date(contentOfAdded(app));
        if (addedDate.getFullYear() < addedAfterYear)
            return false;

        const lastUpdatedDate = new Date(contentOfUpdated(app));
        if (lastUpdatedDate.getFullYear() != updatedAfterYear)
            return false;

        return true;
    }
);

module.exports = {
    isValid,
    isValid2,
    elementsToArray,
    getGitHubProject,
    getGitHubProjectInfos,
    contentOfSource,
    contentOfID
};
