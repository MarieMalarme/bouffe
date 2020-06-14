const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const generateRoutes = (name) => {
  const filePath = path.join(__dirname, `../data/${name}.json`)

  const utils = { filePath, readFile, writeFile }

  const router = express.Router()

  router.get('/', (req, res, next) => {
    readFile(filePath, 'utf8')
      .then((data) => res.json(JSON.parse(data)))
      .catch(next)
  })

  router.post('/', (req, res, next) => handleData(req, res, next, utils))

  router.delete('/', (req, res, next) => handleData(req, res, next, utils))

  return router
}

const handleData = (req, res, next, utils) => {
  const { filePath, readFile, writeFile } = utils

  const deleting = req.method === 'DELETE'
  const posting = req.method === 'POST'

  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(async (data) => {
      data =
        (deleting && data.filter((d) => d.id !== req.body.id)) ||
        (posting && [...data, req.body]) ||
        data
      const content = JSON.stringify(data, null, 2)
      await writeFile(filePath, content, 'utf-8')
      res.json(data)
    })
    .catch(next)
}

module.exports = generateRoutes
