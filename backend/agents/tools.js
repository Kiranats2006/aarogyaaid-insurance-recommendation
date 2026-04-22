const {searchChunks} = require("../services/vectorStore");


async function retrievePolicyChunks(input) {

    const query =
        input.query.toLowerCase();

    const results =
        searchChunks(query);

    return results;

}


module.exports = {
    retrievePolicyChunks
};