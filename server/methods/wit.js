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
    var res = respondToWitOutcome(outcomes);
    console.log(outcomes.entities.datetime);
    console.log(res);
    return res;
  }
});

respondToWitOutcome = function(outcome) {
  if (outcome.confidence < 0.3) {
    // Send joke
    result = "Please don't ask me Siri type of questions, Woof";
    return result;
  }

  switch (outcome.intent) {
    case "get_address":
      // Send address
      result = "Please don't ask me Siri type of questions, Woof";
      break;
    case "get_about":
      // Send about
      result = "Please don't ask me Siri type of questions, Woof";
      break;
    case "get_opening_hours":
      // Send opening hours
      result = "Please don't ask me Siri type of questions, Woof";
      break;
    case "make_reservations":
      // Send make reservations
      result = "Please don't ask me Siri type of questions, Woof";
      break;
    case "set_donation":
      // Send set donations
      result = "Please don't ask me Siri type of questions, Woof";
      break;
  }
  console.log("session set");
  return result;
}
