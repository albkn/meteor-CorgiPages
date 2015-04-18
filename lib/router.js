Router.route('/', {
  name:'homepage'
});


Router.route('/p/:_id', {
  name: 'showPage',
  data: function(){
    return Pages.findOne({_id: this.params._id});
  }
})
