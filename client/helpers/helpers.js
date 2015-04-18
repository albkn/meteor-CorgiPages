extractFbIdFromURL = function(url) {
  var fbId = '';
  var matches = /^.*?www\.facebook\.com\/([\w\._]*)\??.*\s*$/g.exec(url);
  fbId = matches[1];
  return fbId;
}
