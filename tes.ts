import Koa from 'koa'
import Router from 'koa-router'
const _ = require('lodash')

const app = new Koa()
const router = new Router()

app.use(async ctx => {
  let array: string[] = []
  array = ['Erlan', 'Saputra', 'ErlanSaputra', 'SaputraErlan']
  console.log(_.isArray(array))
})

app.listen(2001, () => {
  console.log('Server started, listen on port' + 2001)
})
