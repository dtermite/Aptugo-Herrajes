export interface ICategoriasItem {
  _id?: String
  createdAt: Date

  nombreCategoria: string
  // categorias - productos  - categoriaProducto - categorias - nombreCategoria
  productos: IProductosItem[]
}

export interface IpaginatedCategorias {
  docs: ICategoriasItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IProductosItem {
  _id?: String
  createdAt: Date

  nombreProducto: string

  descripcionProducto: string

  imagenProducto: string
  categoriaProducto: ICategoriasItem
}

export interface IpaginatedProductos {
  docs: IProductosItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
