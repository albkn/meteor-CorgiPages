Meteor.methods({
  'pullDataFromFbGraph': function(data) {
    check(data, {
      facebookurl: String
    });

    /* Make API call (get JSON) */
    FBGraph.setAccessToken(fbAccessToken);

    FBGraph.extendAccessToken({
      "access_token":   fbAccessToken,
      "client_id":      fbClientId,
      "client_secret":  fbClientSecret
    }, function (err, facebookRes) {
       console.log(facebookRes);
    });

    var options = {
      timeout:  10000,
      pool:     { maxSockets:  Infinity },
      headers:  { connection:  "keep-alive" }
    };

    var newId = Pages.insert({});

    FBGraph.setOptions(options).get(data.facebookurl, Meteor.bindEnvironment(
      function(err, res) {
        if (err) console.log(err);
        Pages.update(newId, {$set: {'facebook': res}});
      })
    );

    FBGraph.setOptions(options).get(data.facebookurl+'?fields=photos', Meteor.bindEnvironment(
      function(err, res) {
        if (err) console.log(err);
        Pages.update(newId, {$set: {'facebook_photos': res}});
      })
    );

    return {_id: newId};
  }
});
