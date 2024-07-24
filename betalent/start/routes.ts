import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'Login.Controller.login').prefix('api').middleware('loginMiddleware')

Route.group(() => {
  Route.resource('/users', "User.Controller").apiOnly()
}).prefix('api')

Route.group(() => {
  Route.resource('/clients', "Client.Controller").apiOnly()
}).prefix('api').middleware('authMiddleware').middleware('clientMiddleware')
