/**
 * WatchController
 *
 * @description :: Server-side logic for managing watches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var youtubedl = require('youtube-dl');

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

/**
 * Get hostname of request.
 *
 * @param (object} req
 * @return {string}
 * @api private
 */

function hostnameof(req){
  var host = req.headers.host

  if (!host) {
    return
  }

  var offset = host[0] === '['
    ? host.indexOf(']') + 1
    : 0
  var index = host.indexOf(':', offset)

  return index !== -1
    ? host.substring(0, index)
    : host
}

module.exports = {
  watch: function(req, res){
    var id = req.query.v;
    var host = hostnameof(req);

    var options = [];

    if(host.contains("audio")){
      options.push("--extract-audio");
      options.push("--audio-format=mp3");
    }

    var video = youtubedl('http://www.youtube.com/watch?v='+id, options);
     
    // Will be called when the download starts. 
    video.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info._filename);
      console.log('size: ' + info.size);

      res.attachment(info._filename);
      video.pipe(res);
    });
    
  }
};

