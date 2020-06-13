const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const filePath = path.join(__dirname, './test.json')

const router = express.Router()

router.get('/', (req, res, next) => {
  readFile(filePath, 'utf8')
    .then((data) => res.json(JSON.parse(data)))
    .catch(next)
})

router.post('/', (req, res, next) => {
  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(async (data) => {
      const recipes = [...data, req.body]
      const content = JSON.stringify(recipes, null, 2)
      await writeFile(filePath, content, 'utf-8')
      res.json(recipes)
    })
    .catch(next)
})

module.exports = router
