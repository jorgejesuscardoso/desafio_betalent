/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])


/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  loginMiddleware: () => import('App/Middleware/Login.middleware'),
  authMiddleware: () => import('App/Middleware/Auth.middleware'),
  clientMiddleware: () => import('App/Middleware/client/ClientValidator.middleware'),
  userMiddleware: () => import('App/Middleware/user/UserValidator.middleware'),
  userUpdateMiddleware: () => import('App/Middleware/user/UserUpdateValidator.middleware'),
  clientUpdateMiddleware: () => import('App/Middleware/client/ClientUpdateValidator.middleware'),
  productMiddleware: () => import('App/Middleware/product/ProductValidator.middleware'),
  producUpdatetMiddleware: () => import('App/Middleware/product/ProductUpdateValidator.middleware'),
  saleMiddleware: () => import('App/Middleware/sale/SaleValidator.middleware'),
})

