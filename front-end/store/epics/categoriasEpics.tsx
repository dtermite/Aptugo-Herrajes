import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedCategorias,
  addingCategorias,
  addingCategoriasFailed,
  CategoriasAction,
  CategoriasActionTypes,
  editedCategorias,
  editingCategorias,
  editingCategoriasFailed,
  foundCategorias,
  loadedCategorias,
  loadingCategorias,
  loadingCategoriasFailed,
  removedCategoria,
  removingCategoria,
  removingCategoriaFailed,
  searchingCategorias,
  searchingCategoriasFailed,
} from '../actions/categoriasActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchCategoriasEpic: Epic<CategoriasAction, CategoriasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CategoriasActionTypes.SEARCH_CATEGORIAS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/categorias/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundCategorias(response.data, action.keep)),
        startWith(searchingCategorias()),
        catchError(() => of(searchingCategoriasFailed()))
      )
    })
  )

const loadCategoriasEpic: Epic<CategoriasAction, CategoriasAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(CategoriasActionTypes.LOAD_CATEGORIAS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/categorias/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedCategorias(response.data)),
        startWith(loadingCategorias()),
        catchError(() => of(loadingCategoriasFailed()))
      )
    })
  )
}

const addCategoriasEpic: Epic<CategoriasAction, CategoriasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CategoriasActionTypes.ADD_CATEGORIAS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/categorias/`, data, config)).pipe(
        map((response) => addedCategorias(response.data)),
        startWith(addingCategorias()),
        catchError((err) => of(addingCategoriasFailed(err.response)))
      )
    })
  )

const removeCategoriasEpic: Epic<CategoriasAction, CategoriasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CategoriasActionTypes.REMOVE_CATEGORIA)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/categorias/${action.payload._id}`)).pipe(
        map((response) => removedCategoria()),
        startWith(removingCategoria()),
        catchError(() => of(removingCategoriaFailed()))
      )
    )
  )

const editCategoriasEpic: Epic<CategoriasAction, CategoriasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CategoriasActionTypes.EDIT_CATEGORIAS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/categorias/${action.payload._id}`, data, config)).pipe(
        map((response) => editedCategorias(response.data)),
        startWith(editingCategorias()),
        catchError(() => of(editingCategoriasFailed()))
      )
    })
  )

export default combineEpics(searchCategoriasEpic, loadCategoriasEpic, addCategoriasEpic, removeCategoriasEpic, editCategoriasEpic)
