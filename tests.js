function generateFilename(filename) {
  var ext_regex = /(?:\.([^.]+))?$/
  var ext = ext_regex.exec(filename)[1]
  var date = new Date().getTime()
  var charbank = 'abcdefghijklmnopqrstuvwxyz'
  var fstring = ''
  for(var i = 0; i<15; i++) {
    fstring += charbank[parseInt(Math.random()*26)]
  }
  return (fstring += date + '.' + ext)
}
console.log(generateFilename('name.jpg'));
console.log(generateFilename('peter.png'));
console.log(generateFilename('lois.png'));

require('crypto').randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');

  console.log(token);
});
require('crypto').randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');

  console.log(token);
});
