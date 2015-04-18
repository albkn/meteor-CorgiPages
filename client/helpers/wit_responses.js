WitResponses = new Mongo.Collection(null);

addWitResponseAI = function(response) {
  WitResponses.insert({res: response, fromAI: true});
};

addWitResponseUser = function(response) {
  WitResponses.insert({res: response, fromAI: false});
};
