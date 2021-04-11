const express = require('express')
const router = express.Router()

module.exports = () => {
  router.get('/', async (_, res) => {
    res.render('index')
  })
  return router
}
