import { IpaginatedProductos, IProductosItem } from '../models'

export enum ProductosActionTypes {
  SEARCH_PRODUCTOS = 'productos/search',
  SEARCHING_PRODUCTOS = 'productos/searching',
  FOUND_PRODUCTOS = 'productos/found',
  SEARCHING_PRODUCTOS_FAILED = 'productos/searching_failed',

  LOAD_PRODUCTOS = 'productos/load',
  LOADING_PRODUCTOS = 'productos/loading',
  LOADED_PRODUCTOS = 'productos/loaded',
  LOADING_PRODUCTOS_FAILED = 'productos/loading_failed',

  ADD_PRODUCTOS = 'productos/add',
  ADDING_PRODUCTOS = 'productos/adding',
  ADDED_PRODUCTOS = 'productos/added',
  ADDING_PRODUCTOS_FAILED = 'productos/adding_failed',

  REMOVE_PRODUCTO = 'productos/remove',
  REMOVING_PRODUCTO = 'productos/removing',
  REMOVED_PRODUCTO = 'productos/removed',
  REMOVING_PRODUCTO_FAILED = 'productos/removing_failed',

  EDIT_PRODUCTOS = 'productos/edit',
  EDITING_PRODUCTOS = 'productos/editing',
  EDITED_PRODUCTOS = 'productos/edited',
  EDITING_PRODUCTOS_FAILED = 'productos/editing_failed',
}

export function searchProductos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchProductosAction {
  return {
    type: ProductosActionTypes.SEARCH_PRODUCTOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingProductos(): ISearchingProductosAction {
  return {
    type: ProductosActionTypes.SEARCHING_PRODUCTOS,
  }
}

export function foundProductos(productos: IpaginatedProductos, keep?: boolean): IFoundProductosAction {
  return {
    type: ProductosActionTypes.FOUND_PRODUCTOS,
    keep: keep,
    payload: {
      productos,
    },
  }
}

export function searchingProductosFailed(): ISearchingProductosFailedAction {
  return {
    type: ProductosActionTypes.SEARCHING_PRODUCTOS_FAILED,
  }
}

export function loadProductos(loadOptions: TSearchOptions): ILoadProductosAction {
  return {
    type: ProductosActionTypes.LOAD_PRODUCTOS,
    loadOptions: loadOptions,
  }
}

export function loadingProductos(): ILoadingProductosAction {
  return {
    type: ProductosActionTypes.LOADING_PRODUCTOS,
  }
}

export function loadedProductos(productos: IpaginatedProductos): ILoadedProductosAction {
  return {
    type: ProductosActionTypes.LOADED_PRODUCTOS,
    payload: {
      productos,
    },
  }
}

export function loadingProductosFailed(): ILoadingProductosFailedAction {
  return {
    type: ProductosActionTypes.LOADING_PRODUCTOS_FAILED,
  }
}

export function addProductos(producto: IProductosItem): IAddProductosAction {
  return {
    type: ProductosActionTypes.ADD_PRODUCTOS,
    payload: producto,
  }
}

export function addingProductos(): IAddingProductosAction {
  return {
    type: ProductosActionTypes.ADDING_PRODUCTOS,
  }
}

export function addedProductos(productos: IpaginatedProductos): IAddedProductosAction {
  return {
    type: ProductosActionTypes.ADDED_PRODUCTOS,
    payload: {
      productos,
    },
  }
}

export function addingProductosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingProductosFailedAction {
  return {
    type: ProductosActionTypes.ADDING_PRODUCTOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeProducto(producto: IProductosItem): IRemoveProductoAction {
  return {
    type: ProductosActionTypes.REMOVE_PRODUCTO,
    payload: producto,
  }
}

export function removingProducto(): IRemovingProductoAction {
  return {
    type: ProductosActionTypes.REMOVING_PRODUCTO,
  }
}

export function removedProducto(): IRemovedProductoAction {
  return {
    type: ProductosActionTypes.REMOVED_PRODUCTO,
  }
}

export function removingProductoFailed(): IRemovingProductoFailedAction {
  return {
    type: ProductosActionTypes.REMOVING_PRODUCTO_FAILED,
  }
}

export function editProductos(producto: IProductosItem): IEditProductosAction {
  return {
    type: ProductosActionTypes.EDIT_PRODUCTOS,
    payload: producto,
  }
}

export function editingProductos(): IEditingProductosAction {
  return {
    type: ProductosActionTypes.EDITING_PRODUCTOS,
  }
}

export function editedProductos(productos: IProductosItem): IEditedProductosAction {
  return {
    type: ProductosActionTypes.EDITED_PRODUCTOS,
    payload: productos,
  }
}

export function editingProductosFailed(): IEditingProductosFailedAction {
  return {
    type: ProductosActionTypes.EDITING_PRODUCTOS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchProductosAction {
  type: ProductosActionTypes.SEARCH_PRODUCTOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingProductosAction {
  type: ProductosActionTypes.SEARCHING_PRODUCTOS
}

export interface IFoundProductosAction {
  type: ProductosActionTypes.FOUND_PRODUCTOS
  keep?: boolean
  payload: {
    productos: IpaginatedProductos
  }
}

export interface ISearchingProductosFailedAction {
  type: ProductosActionTypes.SEARCHING_PRODUCTOS_FAILED
}

export interface ILoadProductosAction {
  type: ProductosActionTypes.LOAD_PRODUCTOS
  loadOptions: TSearchOptions
}

export interface ILoadingProductosAction {
  type: ProductosActionTypes.LOADING_PRODUCTOS
}

export interface ILoadedProductosAction {
  type: ProductosActionTypes.LOADED_PRODUCTOS
  payload: {
    productos: IpaginatedProductos
  }
}

export interface ILoadingProductosFailedAction {
  type: ProductosActionTypes.LOADING_PRODUCTOS_FAILED
}

export interface IAddProductosAction {
  type: ProductosActionTypes.ADD_PRODUCTOS
  payload: IProductosItem
}

export interface IAddingProductosAction {
  type: ProductosActionTypes.ADDING_PRODUCTOS
}

export interface IAddedProductosAction {
  type: ProductosActionTypes.ADDED_PRODUCTOS
  payload: {
    productos: IpaginatedProductos
  }
}

export interface IAddingProductosFailedAction {
  type: ProductosActionTypes.ADDING_PRODUCTOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveProductoAction {
  type: ProductosActionTypes.REMOVE_PRODUCTO
  payload: IProductosItem
}

export interface IRemovingProductoAction {
  type: ProductosActionTypes.REMOVING_PRODUCTO
}

export interface IRemovedProductoAction {
  type: ProductosActionTypes.REMOVED_PRODUCTO
}

export interface IRemovingProductoFailedAction {
  type: ProductosActionTypes.REMOVING_PRODUCTO_FAILED
}

export interface IEditProductosAction {
  type: ProductosActionTypes.EDIT_PRODUCTOS
  payload: IProductosItem
}

export interface IEditingProductosAction {
  type: ProductosActionTypes.EDITING_PRODUCTOS
}

export interface IEditedProductosAction {
  type: ProductosActionTypes.EDITED_PRODUCTOS
  payload: IProductosItem
}

export interface IEditingProductosFailedAction {
  type: ProductosActionTypes.EDITING_PRODUCTOS_FAILED
}

export type ProductosAction =
  | ISearchProductosAction
  | ISearchingProductosAction
  | IFoundProductosAction
  | ISearchingProductosFailedAction
  | ILoadProductosAction
  | ILoadingProductosAction
  | ILoadedProductosAction
  | ILoadingProductosFailedAction
  | IAddProductosAction
  | IAddingProductosAction
  | IAddedProductosAction
  | IAddingProductosFailedAction
  | IRemoveProductoAction
  | IRemovingProductoAction
  | IRemovedProductoAction
  | IRemovingProductoFailedAction
  | IEditProductosAction
  | IEditingProductosAction
  | IEditedProductosAction
  | IEditingProductosFailedAction
