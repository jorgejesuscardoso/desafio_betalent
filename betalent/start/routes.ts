import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/usuarios', "UsuariosController").apiOnly()
}).prefix('api')
