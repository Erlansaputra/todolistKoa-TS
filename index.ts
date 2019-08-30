import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
const serve = require('koa-static')
const render = require('koa-ejs')
const path = require('path')
const _ = require('lodash')

const app = new Koa()
const router = new Router()

app.use(koaBody())

//placeholders for add task
let task: any[] = []
//placeholders for complete task
let complete: any[] = []
//placeholders for recyle bin
var recyle: any

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})
app.use(serve(__dirname + '/public'))

router.get('/', async ctx => {
  await ctx.render('index', { task: task, complete: complete })
})

router.post('/addtask', async ctx => {
  let newTask: any[] = ctx.request.body.newtask
  console.log(ctx.request.body)
  task.push(newTask)
  ctx.redirect('/')
  console.log(task)
})

router.post('/complete', ctx => {
  let completeTask: any[] = ctx.request.body.check
  console.log(ctx.request.body)
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === 'string') {
    complete.push(completeTask)
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1)
  } else if (Array.isArray(completeTask)) {
    task.forEach(completeTask => {
      complete.push(completeTask)
    })
    task = []
  }
  ctx.redirect('/')
})

router.post('/removewhile', ctx => {
  var completeTask: any = ctx.request.body.check
  if (typeof completeTask === 'string') {
    recyle = task.splice(task.indexOf(completeTask), 1)
  }
  ctx.redirect('/')
})

router.post('/undo', ctx => {
  if (recyle != null) {
    task.unshift(recyle)
    recyle = null
  }
  ctx.redirect('/')
})

router.post('/reset', ctx => {
  complete = _.remove()
  ctx.redirect('/')
})

app.use(router.routes())

app.listen(2201, () => {
  console.log('Server started, listen on port ' + 2201)
})
