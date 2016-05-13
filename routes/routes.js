function router (express, app, formidable, fs, os, gm, knoxClient) {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    res.render('index', {
      host: app.get('host')
    })
  })

  router.post('/upload', function(req, res, next) {
    function getExtension(filename) {
      var ext_regex = /(?:\.([^.]+))?$/
      return ext_regex.exec(filename)[1]
    }
    function generateFilename(filename) {
      var ext = getExtension(filename)
      var date = new Date().getTime()
      var charbank = 'abcdefghijklmnopqrstuvwxyz'
      var fstring = ''
      for(var i = 0; i<15; i++) {
        fstring += charbank[parseInt(Math.random()*26)]
      }
      return (fstring += date + '.' + ext)
    }

    var tmpFile, nfile, fname;

    var newForm = new formidable.IncomingForm()
    newForm.keepExtensions(true)
    newForm.parse(req, function(err, fields, files) {
      // -----------------------------------
      console.dir(files)
      // -----------------------------------
      tmpFile = files.upload.path
      fname = generateFilename(files.upload.name)
      nfile = os.tmpDir() + '/' + fname
      // -----------------------------------
      console.dir(tmpFile, fname, nfile)
      // -----------------------------------
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end()
    })

    newForm.on('end', function() {
      fs.rename(tmpFile, nfile, function(err) {
        // Resize the image and upload this file into the S3 bucket
        gm(nfile).resize(300).write(nfile, function() {
          // Upload to the S3 Bucket
          fs.readFile(nfile, function(err, buf) {
            var request = knoxClient.put(fname, {
              'Content-Length': buf.length,
              'Content-Type': 'image/'+getExtension(nfile)
            })

            request.on('response', function(response) {
              if (response.statusCode == 200) {
                // the file is in the S3 bucket
              }
            })

            request.end(buf);
          })

        })
      })
    })

  })

  app.use('/', router)
}

module.exports = router
