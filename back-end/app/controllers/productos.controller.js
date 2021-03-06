const productos = require('../models/productos.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new producto
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  // required validation
  if (typeof data.nombreProducto !== 'undefined' && !data.nombreProducto) {
    options.res.status(422).send({ message: 'nombreProducto requires a value', field: 'nombreProducto' })
    return
  }

  // required validation
  if (typeof data.descripcionProducto !== 'undefined' && !data.descripcionProducto) {
    options.res.status(422).send({ message: 'descripcionProducto requires a value', field: 'descripcionProducto' })
    return
  }

  if (typeof data.nombreProducto !== 'undefined') updatedData['nombreProducto'] = data.nombreProducto

  if (typeof data.descripcionProducto !== 'undefined') updatedData['descripcionProducto'] = data.descripcionProducto

  if (options.req.files && options.req.files.imagenProducto && options.req.files.imagenProducto.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagenProducto.name}`, options.req.files.imagenProducto.data)
    updatedData['imagenProducto'] = options.req.files.imagenProducto.name
  }
  if (data.categoriaProducto === 'null') data.categoriaProducto = null
  updatedData['categoriaProducto'] = {}
  try {
    const categorias = require('../models/categorias.model.js')
    let ReceivedcategoriaProducto = typeof data.categoriaProducto === 'string' ? JSON.parse(data.categoriaProducto) : data.categoriaProducto
    categoriaProductoinfo = Array.isArray(ReceivedcategoriaProducto) ? ReceivedcategoriaProducto[0] : ReceivedcategoriaProducto

    if (!categoriaProductoinfo._id) {
      const categoriaProductoID = require('mongoose').Types.ObjectId()
      const categoria = new categorias({ ...categoriaProductoinfo, _id: categoriaProductoID })
      categoria.save()
      updatedData['categoriaProducto'] = categoriaProductoID
    } else {
      updatedData['categoriaProducto'] = categoriaProductoinfo._id
    }
  } catch (e) {
    updatedData['categoriaProducto'] = data.categoriaProducto
  }

  // Create a producto
  const producto = new productos(updatedData)

  // Save producto in the database
  producto
    .save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    // required validation
    if (typeof data.nombreProducto !== 'undefined' && !data.nombreProducto) {
      options.res.status(422).send({ message: 'nombreProducto requires a value', field: 'nombreProducto' })
      return
    }

    // required validation
    if (typeof data.descripcionProducto !== 'undefined' && !data.descripcionProducto) {
      options.res.status(422).send({ message: 'descripcionProducto requires a value', field: 'descripcionProducto' })
      return
    }

    if (typeof data.nombreProducto !== 'undefined') updatedData['nombreProducto'] = data.nombreProducto

    if (typeof data.descripcionProducto !== 'undefined') updatedData['descripcionProducto'] = data.descripcionProducto

    if (options.req.files && options.req.files.imagenProducto && options.req.files.imagenProducto.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagenProducto.name}`, options.req.files.imagenProducto.data)
      updatedData['imagenProducto'] = options.req.files.imagenProducto.name
    }
    if (data.categoriaProducto === 'null') data.categoriaProducto = null
    updatedData['categoriaProducto'] = {}
    try {
      const categorias = require('../models/categorias.model.js')
      let ReceivedcategoriaProducto = typeof data.categoriaProducto === 'string' ? JSON.parse(data.categoriaProducto) : data.categoriaProducto
      categoriaProductoinfo = Array.isArray(ReceivedcategoriaProducto) ? ReceivedcategoriaProducto[0] : ReceivedcategoriaProducto

      if (!categoriaProductoinfo._id) {
        const categoriaProductoID = require('mongoose').Types.ObjectId()
        const categoria = new categorias({ ...categoriaProductoinfo, _id: categoriaProductoID })
        categoria.save()
        updatedData['categoriaProducto'] = categoriaProductoID
      } else {
        updatedData['categoriaProducto'] = categoriaProductoinfo._id
      }
    } catch (e) {
      updatedData['categoriaProducto'] = data.categoriaProducto
    }

    // Create a producto
    const producto = new productos(updatedData)

    // Save producto in the database
    producto
      .save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all productos from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  productos
    .find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('categorias') > -1) && {
        strictPopulate: false,
        model: 'categorias',
        path: 'categoriaProducto',
      }
    )
    .then((productos) => {
      options.res.json(paginate.paginate(productos, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (productos.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (productos.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (productos.schema.path(query.searchField).instance === 'ObjectID' || productos.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    productos
      .find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('categorias') > -1) && {
          strictPopulate: false,
          model: 'categorias',
          path: 'categoriaProducto',
        }
      )
      .then((producto) => {
        resolve(paginate.paginate(producto, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single producto with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    productos
      .findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('categorias') > -1) && {
          strictPopulate: false,
          model: 'categorias',
          path: 'categoriaProducto',
        }
      )
      .then((producto) => {
        if (!producto) {
          return options.res.status(404).send({
            message: 'producto not found with id ' + id,
          })
        }
        resolve(paginate.paginate([producto]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'producto not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving producto with id ' + id,
        })
      })
  })
}

// Update a producto identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.nombreProducto !== 'undefined') updatedData['nombreProducto'] = data.nombreProducto

    if (typeof data.descripcionProducto !== 'undefined') updatedData['descripcionProducto'] = data.descripcionProducto

    if (options.req.files && options.req.files.imagenProducto && options.req.files.imagenProducto.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.imagenProducto.name}`, options.req.files.imagenProducto.data)
      updatedData['imagenProducto'] = options.req.files.imagenProducto.name
    }
    if (data.categoriaProducto === 'null') data.categoriaProducto = null
    updatedData['categoriaProducto'] = {}
    try {
      const categorias = require('../models/categorias.model.js')
      let ReceivedcategoriaProducto = typeof data.categoriaProducto === 'string' ? JSON.parse(data.categoriaProducto) : data.categoriaProducto
      categoriaProductoinfo = Array.isArray(ReceivedcategoriaProducto) ? ReceivedcategoriaProducto[0] : ReceivedcategoriaProducto

      if (!categoriaProductoinfo._id) {
        const categoriaProductoID = require('mongoose').Types.ObjectId()
        const categoria = new categorias({ ...categoriaProductoinfo, _id: categoriaProductoID })
        categoria.save()
        updatedData['categoriaProducto'] = categoriaProductoID
      } else {
        updatedData['categoriaProducto'] = categoriaProductoinfo._id
      }
    } catch (e) {
      updatedData['categoriaProducto'] = data.categoriaProducto
    }

    // Find producto and update it with the request body
    const query = { populate: 'true' }
    productos
      .findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('categorias') > -1) && {
          strictPopulate: false,
          model: 'categorias',
          path: 'categoriaProducto',
        }
      )
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a producto with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    productos
      .deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
