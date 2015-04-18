Meteor.methods({
  'getIntentFromWit': function(data) {
    check(data, {
      question: String
    });

    /* Make API call to Wit ai */
    var apiURL = 'https://api.wit.ai/message?v=20141022&q='+data.question;
    var authString = "Bearer " + witAccessToken;
    var res = HTTP.get(apiURL, {
      headers: { Authorization: authString }
    });
    var outcomes = JSON.parse(res.content).outcomes[0];
    console.log(outcomes)
    var res = respondToWitOutcome(outcomes);
    //console.log(outcomes.entities.datetime);
    console.log(res);
    return res;
  }
});

respondToWitOutcome = function(outcome) {
  var result = {};
  if (outcome.confidence < 0.3) {
    // Send joke
    result.type = "joke";
    return result;
  }

  switch (outcome.intent) {
    case "get_address":
      // Send address
      result.type = "address";
      break;
    case "get_about":
      // Send about
      result.type = "about";
      break;
    case "get_opening_hours":
      // Send opening hours
      result.type = "opening_hours ";
      break;
    case "make_reservations":
      // Send make reservations
      result.type = "make_reservations";
      break;
    case "set_donation":
      // Send set donations
      result.type = "set_donation";
      break;
  }
  return result;
}
