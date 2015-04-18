Template.homepage.helpers({

});


Template.homepage.events({

  'submit .pageConvert': function(e){
    e.preventDefault();

    var data = {
      facebookurl: $(e.target).find('[name=facebookurl]').val()
    }

    

    alert(data.facebookurl);
  }


});
