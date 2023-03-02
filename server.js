// npm init -y se our project has been initialised with being a node js project,,.. 
// Now here we will do the backend also in js. So will go to express js

const express = require('express')
const path = require('path')
const app = express()
const {mergePdfs} = require('./merge')
const multer = require('multer')
const { request } = require('http')
const upload = multer({dest: 'upload/' })
app.use('/static',express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  //res.send({data: req.files}) //=> If we will do it then we can have our files displayes, now we can do whatever the fuck i want with it...
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf` )
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

// In this compliacted 