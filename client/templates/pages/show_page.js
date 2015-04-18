var setReservation = function(datetime, reservation){

  var data ={
    reservationTime: dateTime

  }
}


Template.showPage.helpers({

  cleanSyntax: function(paragraph){
    if(paragraph){
      return paragraph.replace(/\n/g, "<br />");
    } else {
      return paragraph
    }

  },

  witResponse: function(){
    return WitResponses.find();
  },

  getProfile: function(){
    document.title = this.facebook.name
    return this.facebook_photos.photos.data[0].images[0].source
  },

  photosList: function(){
    return this.facebook_photos.photos.data
  },

  getImage: function(){
    return this.images[0].source
  },

  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      // Map initialization options
      var placeLat = this.facebook.location.latitude;
      var placeLng = this.facebook.location.longitude;

      return {
        center: new google.maps.LatLng(placeLat, placeLng),
        zoom: 16
      };
    }
  },



});


Template.showPage.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});


Template.showPage.events({

  'submit .submit-query': function(e){
    e.preventDefault();

    var query =  $(e.target).find('[name=query]').val();

    var data ={
      question: query
    }

    var facebookName = this.facebook.name;
    var facebookAddress = this.facebook.location.street+' '+this.facebook.location.city+' '+this.facebook.location.zip;
    var facebookHours = this.facebook.hours;
    console.log(facebookHours);
    addWitResponseUser(query);

    Meteor.call('getIntentFromWit', data, function(err,res){

      switch(res.type){
        case "joke":
          Router.go('/lmgtfy/'+encodeURI(query));
          break;
        case "address":
          addWitResponseAI(facebookAddress);
          break;
        case "about":
          alert(this.facebook.about);
          break;
        case "opening_hours":
          if (!res.day) res.day = 'all';
          var toPrint = '';
          if (res.day == 'monday' || res.day == 'all') {
            toPrint += 'Monday: '+facebookHours.mon_1_open+' - '+facebookHours.mon_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'tuesday' || res.day == 'all') {
            toPrint += 'Tuesday: '+facebookHours.tue_1_open+' - '+facebookHours.tue_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'wednesday' || res.day == 'all') {
            toPrint += 'Wednesday: '+facebookHours.wed_1_open+' - '+facebookHours.wed_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'thursday' || res.day == 'all') {
            toPrint += 'Thursday: '+facebookHours.thu_1_open+' - '+facebookHours.thu_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'friday' || res.day == 'all') {
            toPrint += 'Friday: '+facebookHours.fri_1_open+' - '+facebookHours.fri_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'saturday' || res.day == 'all') {
            toPrint += 'Saturday: '+facebookHours.sat_1_open+' - '+facebookHours.sat_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          if (res.day == 'sunday' || res.day == 'all') {
            toPrint += 'Sunday: '+facebookHours.sun_1_open+' - '+facebookHours.sun_1_close;
            if (res.day == 'all') toPrint += '<br/>';
          }

          var finalString = '';
          if (res.day == 'all')
            finalString = 'We are open on:<br/>' + toPrint + '<br/>Woof!';
          else
            finalString = 'On ' + toPrint + ', Woof!';

          addWitResponseAI(finalString);
          break;
        }
    });
    $(e.target).find('[name=query]').val('');
  }

})
