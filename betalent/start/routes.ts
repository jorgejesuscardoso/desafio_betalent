import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'Auth.Controller.login').prefix('api').middleware('auth')

Route.group(() => {
  Route.resource('/users', "User.Controller").apiOnly()
}).prefix('api')
