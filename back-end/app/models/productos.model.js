const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productosSchema = mongoose.Schema(
  {
    nombreProducto: {
      type: String,
      required: true,
    },
    descripcionProducto: {
      type: String,
      required: true,
    },
    imagenProducto: String,

    categoriaProducto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorias',
      autopopulate: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

productosSchema.plugin(mongoosePaginate)
productosSchema.index({
  nombreProducto: 'text',
  descripcionProducto: 'text',
  imagenProducto: 'text',
  categoriaProducto: 'text',
})

const myModel = (module.exports = mongoose.model('productos', productosSchema, 'productos'))
myModel.schema = productosSchema
