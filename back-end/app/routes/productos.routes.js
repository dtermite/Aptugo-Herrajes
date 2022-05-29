module.exports = (app) => {
  const productos = require('../controllers/productos.controller.js')

  // Get all records
  app.get('/api/productos', (req, res) => {
    productos.findAll({ req, res })
  })

  // Search records
  app.get('/api/productos/search', (req, res) => {
    productos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/productos/:ID', (req, res) => {
    productos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/productos', (req, res) => {
    productos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/productos/:ID', (req, res) => {
    productos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/productos/:ID', (req, res) => {
    productos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
