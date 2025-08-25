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
  })
  .prefix('/projects')
  .as('projects')
  .use(middleware.auth())
