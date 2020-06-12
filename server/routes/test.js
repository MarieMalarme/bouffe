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
