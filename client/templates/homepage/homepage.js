Template.homepage.helpers({

});


Template.homepage.events({

  'submit .pageConvert': function(e){
    e.preventDefault();

    var input = $(e.target).find('[name=facebookurl]').val();
    var facebookurl = extractFbIdFromURL(input);

    var data = {
      facebookurl: facebookurl
    }

    Meteor.call('pullDataFromFbGraph', data);
  }


});
