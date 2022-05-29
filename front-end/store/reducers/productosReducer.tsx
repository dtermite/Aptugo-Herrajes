import produce from 'immer'
import { ProductosAction, ProductosActionTypes } from '../actions/productosActions'
import { ApiStatus, IProductosItem } from '../models'

export const initialProductosState: IProductosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  productos: [],
  foundproductos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function productosReducer(state: IProductosState = initialProductosState, action: ProductosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ProductosActionTypes.SEARCH_PRODUCTOS:
        draft.searchString = action.searchOptions.searchString
        break
      case ProductosActionTypes.SEARCHING_PRODUCTOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ProductosActionTypes.SEARCHING_PRODUCTOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ProductosActionTypes.FOUND_PRODUCTOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundproductos.push(...action.payload.productos.docs) : (draft.foundproductos = action.payload.productos.docs)
        draft.totalDocs = action.payload.productos.totalDocs
        break

      case ProductosActionTypes.LOAD_PRODUCTOS:
      case ProductosActionTypes.LOADING_PRODUCTOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundproductos = []
        break

      case ProductosActionTypes.LOADING_PRODUCTOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ProductosActionTypes.LOADED_PRODUCTOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.productos = action.payload.productos.docs
        draft.totalDocs = action.payload.productos.totalDocs
        break

      case ProductosActionTypes.ADD_PRODUCTOS:
      case ProductosActionTypes.ADDING_PRODUCTOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ProductosActionTypes.ADDING_PRODUCTOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ProductosActionTypes.ADDED_PRODUCTOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.productos.push(action.payload.productos.docs[0])
        if (draft.searchString) draft.foundproductos.push(action.payload.productos.docs[0])
        break

      case ProductosActionTypes.REMOVE_PRODUCTO:
        draft.productos.splice(
          draft.productos.findIndex((producto) => producto._id === action.payload._id),
          1
        )
        break

      case ProductosActionTypes.EDIT_PRODUCTOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.productos[draft.productos.findIndex((producto) => producto._id === action.payload._id)] = action.payload
        break

      case ProductosActionTypes.EDITED_PRODUCTOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.productos[draft.productos.findIndex((producto) => producto._id === action.payload._id)] = action.payload
        draft.foundproductos[draft.foundproductos.findIndex((producto) => producto._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IProductosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  productos: IProductosItem[]
  foundproductos: IProductosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
