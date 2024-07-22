import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login').prefix('api').middleware('auth')
Route.post('/register', 'AuthController.register').prefix('api').middleware('register')

Route.group(() => {
  Route.resource('/user', "UserController").apiOnly()
}).prefix('api')
