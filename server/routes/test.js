const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)

const filePath = path.join(__dirname, './test.json')

const router = express.Router()

router.get('/', (req, res, next) => {
  readFile(filePath, 'utf8')
    .then((data) => res.json(JSON.parse(data)))
    .catch(next)
})

module.exports = router

// const express = require('express')
// const fs = require('fs')
// const util = require('util')
// const path = require('path')

// const router = express.Router()
// const readFile = util.promisify(fs.readFile)
// const writeFile = util.promisify(fs.writeFile)

// const filePath = path.join(__dirname, '../data/test.json')

// router.get('/', (req, res, next) => {
//   readFile(filePath, 'utf8')
//     .then((data) => {
//       const test = JSON.parse(data)
//       console.log(test)
//       response.json(test)
//     })
//     .catch(next)
// })

// module.exports = router
