import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'Login.Controller.login').prefix('api').middleware('loginMiddleware')

// Rotas de usuários
Route.group(() => {
  Route.post('/users', 'User.Controller.store').middleware('userMiddleware')

  Route.get('/users', 'User.Controller.index').middleware('authMiddleware')

  Route.get('/users/:id', 'User.Controller.show').middleware('authMiddleware')

  Route.put('/users/:id', 'User.Controller.update').middleware(['authMiddleware', 'userUpdateMiddleware'])

  Route.patch('/users/:id', 'User.Controller.update').middleware(['authMiddleware', 'userUpdateMiddleware'])

  Route.delete('users/:id', 'User.Controller.destroy').middleware('authMiddleware')
}).prefix('api')

// Rotas de clientes
Route.group(() => {
  
  Route.post('/clients', 'Client.Controller.store').middleware(['authMiddleware', 'clientMiddleware'])

  Route.get('/clients', 'Client.Controller.index').middleware('authMiddleware')

  Route.get('/clients/:id', 'Client.Controller.show').middleware('authMiddleware')

  Route.patch('/clients/:id', 'Client.Controller.update').middleware(['authMiddleware', 'clientUpdateMiddleware'])

  Route.put('/clients/:id', 'Client.Controller.update').middleware(['authMiddleware', 'clientUpdateMiddleware'])

  Route.delete('/clients/:id', 'Client.Controller.destroy').middleware('authMiddleware')
}).prefix('api')

// Rotas de produtos
Route.group(() => {
  Route.post('/products', 'Product.Controller.store').middleware(['authMiddleware', 'productMiddleware'])

  Route.get('/products', 'Product.Controller.index').middleware('authMiddleware')

  Route.get('/products/:id', 'Product.Controller.show').middleware('authMiddleware')

  Route.patch('/products/:id', 'Product.Controller.update').middleware(['authMiddleware', 'producUpdatetMiddleware'])

  Route.put('/products/:id', 'Product.Controller.update').middleware(['authMiddleware', 'producUpdatetMiddleware'])

  Route.delete('/products/:id', 'Product.Controller.destroy').middleware('authMiddleware')
}).prefix('api')

// Rotas de vendas
Route.group(() => {
  Route.post('/sales', 'Sale.Controller.store').middleware(['authMiddleware', 'saleMiddleware'])

  Route.get('/sales', 'Sale.Controller.index').middleware('authMiddleware')

  Route.get('/sales/:id', 'Sale.Controller.show').middleware('authMiddleware')

  Route.delete('/sales/:id', 'Sale.Controller.destroy').middleware('authMiddleware')
}).prefix('api')
