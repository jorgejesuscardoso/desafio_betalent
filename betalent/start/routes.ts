import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'
import fs from 'fs'

// Rota de login
Route.post('/login', 'Login.Controller.login').prefix('api').middleware('loginMiddleware')

// Servir as imagens(thumbnails)
Route.get('/thumbs/:thumbnail', async ({ params, response}) => {
  const { thumbnail } = params
  const filePath = Application.publicPath(`thumbs/${thumbnail}`)
  
  // Verifica se o arquivo existe
  if (fs.existsSync(filePath)) {
    return response.download(filePath)
  } else {
    return response.status(404).send('File not found')
  }
}).prefix('api')

// Rotas de usuários
Route.group(() => {
  Route.post('/users', 'User.Controller.store')
  .middleware('userMiddleware')

  Route.get('/users', 'User.Controller.index').middleware('authMiddleware')

  Route.get('/users/:id', 'User.Controller.show')
  .middleware('authMiddleware')
  Route.put('/users/:id', 'User.Controller.update')
  .middleware('userUpdateMiddleware').middleware('authMiddleware')

  Route.patch('/users/:id', 'User.Controller.update')
  .middleware('userUpdateMiddleware').middleware('authMiddleware')

  Route.delete('users/:id', 'User.Controller.destroy').middleware('authMiddleware')
}).prefix('api')

// Rotas de clientes
Route.group(() => {
  
  Route.post('/clients', 'Client.Controller.store')
  .middleware('clientMiddleware')

  Route.get('/clients', 'Client.Controller.index')

  Route.get('/clients/:id', 'Client.Controller.show')

  Route.patch('/clients/:id', 'Client.Controller.update')
  .middleware('clientUpdateMiddleware')

  Route.put('/clients/:id', 'Client.Controller.update')
  .middleware('clientUpdateMiddleware')

  Route.delete('/clients/:id', 'Client.Controller.destroy')
}).prefix('api').middleware('authMiddleware')

// Rotas de produtos
Route.group(() => {
  Route.post('/products', 'Product.Controller.store')
  .middleware('productMiddleware')

  Route.get('/products', 'Product.Controller.index')

  Route.get('/products/:id', 'Product.Controller.show')

  Route.patch('/products/:id', 'Product.Controller.update')
  .middleware('producUpdatetMiddleware')

  Route.put('/products/:id', 'Product.Controller.update')
  .middleware('producUpdatetMiddleware')

  Route.delete('/products/:id', 'Product.Controller.destroy')
}).prefix('api').middleware('authMiddleware')

// Rotas de vendas
Route.group(() => {
  Route.post('/sales', 'Sale.Controller.store').middleware('saleMiddleware')

  Route.get('/sales', 'Sale.Controller.index')

  Route.get('/sales/:id', 'Sale.Controller.show')
  
}).prefix('api').middleware('authMiddleware')
