/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', '#controllers/home_controller.index').as('home').use(middleware.guest())

router
  .group(() => {
    router
      .get('/register', '#controllers/auth/register_controller.show')
      .as('register.show')
      .use(middleware.guest())

    router
      .post('/register', '#controllers/auth/register_controller.store')
      .as('register.store')
      .use(middleware.guest())

    router
      .get('/login', '#controllers/auth/login_controller.show')
      .as('login.show')
      .use(middleware.guest())

    router
      .post('/login', '#controllers/auth/login_controller.store')
      .as('login.store')
      .use(middleware.guest())

    router
      .post('/logout', '#controllers/auth/logout_controller.handle')
      .as('logout')
      .use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

router
  .get('/dashboard', '#controllers/dashboard_controller.show')
  .as('dashboard.show')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', '#controllers/projects_controller.index').as('index')
    router.get('/create', '#controllers/projects_controller.create').as('create')
    router.post('/', '#controllers/projects_controller.store').as('store')
    router.get('/:id', '#controllers/projects_controller.show').as('show')
    router.patch('/:id', '#controllers/projects_controller.update').as('update')
    router.delete('/:id', '#controllers/projects_controller.destroy').as('destroy')
    router
      .patch('/:id/regenerate-api-key', '#controllers/projects_controller.regenerateApiKey')
      .as('regenerateApiKey')
    router
      .patch('/:id/toggle-active', '#controllers/projects_controller.toggleActive')
      .as('toggleActive')
    router.post('/switch', '#controllers/projects_controller.switch').as('switch')
  })
  .prefix('/projects')
  .as('projects')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', '#controllers/notifications_controller.index').as('index')
    router.get('/create', '#controllers/notifications_controller.create').as('create')
    router.post('/', '#controllers/notifications_controller.store').as('store')
    router.get('/:id/edit', '#controllers/notifications_controller.edit').as('edit')
    router.get('/:id', '#controllers/notifications_controller.show').as('show')
    router.patch('/:id', '#controllers/notifications_controller.update').as('update')
    router.delete('/:id', '#controllers/notifications_controller.destroy').as('destroy')
  })
  .prefix('/notifications')
  .as('notifications')
  .use([middleware.auth(), middleware.project()])

router
  .group(() => {
    router.get('/', '#controllers/templates_controller.index').as('index')
    router.get('/create', '#controllers/templates_controller.create').as('create')
    router.post('/', '#controllers/templates_controller.store').as('store')
    router.get('/:id', '#controllers/templates_controller.show').as('show')
    router.get('/:id/edit', '#controllers/templates_controller.edit').as('edit')
    router.patch('/:id', '#controllers/templates_controller.update').as('update')
    router.delete('/:id', '#controllers/templates_controller.destroy').as('destroy')
  })
  .prefix('/templates')
  .as('templates')
  .use([middleware.auth(), middleware.project()])
