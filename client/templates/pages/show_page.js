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



    addWitResponseUser(query);


    Meteor.call('getIntentFromWit', data, function(err,res){

      switch(res.type){
        case "address":
          addWitResponseAI(facebookAddress);
          break;
        case "about":
          alert(this.facebook.about);
          break;
        }
    });


  }

})
