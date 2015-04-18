Meteor.methods({
  'pullDataFromFbGraph': function(data) {
    /* Make API call (get JSON) */
    FBGraph.setAccessToken('CAACEdEose0cBABhu3ApHh6xMZAmvfhtDLmIEZBcOBrtuUufHeCpNxVOU2CtywKZAjW2dAaS5svgkcldpPfPAAhllZBEKqdKZCi6mGklWaZAql6ZBSlhZBNVGIRBXpL4R9v7hJpuX6vlvP8JbSEay0wmidtRLxz9h3rzl1DP2rhYnlykpZCM2QtQzRVdu7HvEQd7zWL4uTlmxAutBZCLkUhtfVY');

    var options = {
      timeout:  10000,
      pool:     { maxSockets:  Infinity },
      headers:  { connection:  "keep-alive" }
    };

    var newId = Pages.insert({});

    FBGraph.setOptions(options).get(data, Meteor.bindEnvironment(
      function(err, res) {
        if (err) console.log(err);
        Pages.update(newId, res);
      })
    );

    return {_id: newId};
  }
});
