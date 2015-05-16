Router.route('/', {
  name:'homepage'
});

Router.route('/p/:_id', {
  name: 'showPage',
  onBeforeAction: function(){
    GoogleMaps.load();
    this.next();
  },
  data: function(){
    return Pages.findOne({_id: this.params._id});
  }
});

Router.route('/copysite/:_id', {
  name: 'copySite',
  data: function(){
    return CopySites.findOne({_id: this.params._id});
  }
});

Router.route('/lmgtfy/:search', function() {
  this.response.writeHead(302, {
    'Location': "http://lmgtfy.com/?q=" + this.params.search
  });
  this.response.end();
},{
  where: 'server'
});
