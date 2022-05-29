const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const categoriasSchema = mongoose.Schema(
  {
    nombreCategoria: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

categoriasSchema.virtual('productos', {
  ref: 'productos',
  localField: '_id',
  foreignField: 'categoriaProducto',
  justOne: false,
  type: '',
})

categoriasSchema.plugin(mongoosePaginate)
categoriasSchema.index({
  nombreCategoria: 'text',
})

const myModel = (module.exports = mongoose.model('categorias', categoriasSchema, 'categorias'))
myModel.schema = categoriasSchema
