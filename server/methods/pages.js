Meteor.methods({
  'pullDataFromFbId': function(data) {
    /* Make API call (get JSON) */
    FBGraph.setAccessToken('CAACEdEose0cBADzYbZCKd0UZCAKgTvu4yqvlS4RwAQKPpSBtgAOXojQvHDf7z5mvORcGz00d1ZCDh5aY9yz1ockSKJk2h0PrTGveFox9eErZCTn3kFybNXwPojaJdbIhNqEilxLZAfMYB6PzaoTl16LZAqgypPNKL9JGQdB936vmxVfZBMSYzwnUYuRJK5xIOWyBZA0TUMvb4H6NGBeojhaU');

    var options = {
      timeout:  3000,
      pool:     { maxSockets:  Infinity },
      headers:  { connection:  "keep-alive" }
    };

    FBGraph.setOptions(options).get(data, function(err, res) {
      if (err) console.log(err);
      console.log(res);
    });
  }
});
