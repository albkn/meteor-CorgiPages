Meteor.methods({
  'getIntentFromWit': function(data) {
    check(data, {
      question: String
    });

    /* Make API call to Wit ai */
    var apiURL = 'https://api.wit.ai/message?v=20141022&q='+data.question;
    var authString = "Bearer " + CREDENTIALS.wit.accessToken;
    var apiRes = HTTP.get(apiURL, {
      headers: { Authorization: authString }
    });
    var outcomes = JSON.parse(apiRes.content).outcomes[0];
    var res = respondToWitOutcome(outcomes);
    return res;
  }
});

var respondToWitOutcome = function(outcome) {
  var result = {};
  if (outcome.confidence < 0.5) {
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
      result.type = "opening_hours";
      if (!outcome.entities.day)
        result.day = 'all';
      else
        result.day = outcome.entities.day[0].value.toLowerCase();
      result.openClose = outcome.entities.open_close[0].value.toLowerCase();
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
};
