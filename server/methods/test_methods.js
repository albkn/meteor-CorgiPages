Meteor.methods({

  getResultFromWit: function(){

    witBase = 'https://api.wit.ai/message?v=20141022&q=how%20many%20people%20between%20Tuesday%20and%20Friday';


    HTTP.get(witBase, function(err, res){
      console.log(res);
    })

  }

});
