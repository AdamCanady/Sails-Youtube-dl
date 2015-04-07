/**
 * WatchController
 *
 * @description :: Server-side logic for managing watches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var youtubedl = require('youtube-dl');

module.exports = {
  watch: function(req, res){
    var id = req.query.v;

    var video = youtubedl('http://www.youtube.com/watch?v='+id);
     
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

