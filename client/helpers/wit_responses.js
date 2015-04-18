WitResponses = new Mongo.Collection(null);

addWitResponse = function(response) {
  WitResponses.insert({res: response});
};
