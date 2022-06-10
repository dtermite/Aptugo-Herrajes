import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedProductos,
  addingProductos,
  addingProductosFailed,
  editedProductos,
  editingProductos,
  editingProductosFailed,
  foundProductos,
  loadedProductos,
  loadingProductos,
  loadingProductosFailed,
  ProductosAction,
  ProductosActionTypes,
  removedProducto,
  removingProducto,
  removingProductoFailed,
  searchingProductos,
  searchingProductosFailed,
} from '../actions/productosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchProductosEpic: Epic<ProductosAction, ProductosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductosActionTypes.SEARCH_PRODUCTOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://herrajes_diegotermitegmailcom.backend.aptugo.app/api/productos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundProductos(response.data, action.keep)),
        startWith(searchingProductos()),
        catchError(() => of(searchingProductosFailed()))
      )
    })
  )

const loadProductosEpic: Epic<ProductosAction, ProductosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ProductosActionTypes.LOAD_PRODUCTOS)),
    switchMap((action) => {
      let url = `https://herrajes_diegotermitegmailcom.backend.aptugo.app/api/productos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedProductos(response.data)),
        startWith(loadingProductos()),
        catchError(() => of(loadingProductosFailed()))
      )
    })
  )
}

const addProductosEpic: Epic<ProductosAction, ProductosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductosActionTypes.ADD_PRODUCTOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://herrajes_diegotermitegmailcom.backend.aptugo.app/api/productos/`, data, config)).pipe(
        map((response) => addedProductos(response.data)),
        startWith(addingProductos()),
        catchError((err) => of(addingProductosFailed(err.response)))
      )
    })
  )

const removeProductosEpic: Epic<ProductosAction, ProductosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductosActionTypes.REMOVE_PRODUCTO)),
    mergeMap((action) =>
      from(axios.delete(`https://herrajes_diegotermitegmailcom.backend.aptugo.app/api/productos/${action.payload._id}`)).pipe(
        map((response) => removedProducto()),
        startWith(removingProducto()),
        catchError(() => of(removingProductoFailed()))
      )
    )
  )

const editProductosEpic: Epic<ProductosAction, ProductosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductosActionTypes.EDIT_PRODUCTOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://herrajes_diegotermitegmailcom.backend.aptugo.app/api/productos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedProductos(response.data)),
        startWith(editingProductos()),
        catchError(() => of(editingProductosFailed()))
      )
    })
  )

export default combineEpics(searchProductosEpic, loadProductosEpic, addProductosEpic, removeProductosEpic, editProductosEpic)
