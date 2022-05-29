import produce from 'immer'
import { CategoriasAction, CategoriasActionTypes } from '../actions/categoriasActions'
import { ApiStatus, ICategoriasItem } from '../models'

export const initialCategoriasState: ICategoriasState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  categorias: [],
  foundcategorias: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function categoriasReducer(state: ICategoriasState = initialCategoriasState, action: CategoriasAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CategoriasActionTypes.SEARCH_CATEGORIAS:
        draft.searchString = action.searchOptions.searchString
        break
      case CategoriasActionTypes.SEARCHING_CATEGORIAS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case CategoriasActionTypes.SEARCHING_CATEGORIAS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case CategoriasActionTypes.FOUND_CATEGORIAS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundcategorias.push(...action.payload.categorias.docs) : (draft.foundcategorias = action.payload.categorias.docs)
        draft.totalDocs = action.payload.categorias.totalDocs
        break

      case CategoriasActionTypes.LOAD_CATEGORIAS:
      case CategoriasActionTypes.LOADING_CATEGORIAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundcategorias = []
        break

      case CategoriasActionTypes.LOADING_CATEGORIAS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case CategoriasActionTypes.LOADED_CATEGORIAS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.categorias = action.payload.categorias.docs
        draft.totalDocs = action.payload.categorias.totalDocs
        break

      case CategoriasActionTypes.ADD_CATEGORIAS:
      case CategoriasActionTypes.ADDING_CATEGORIAS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case CategoriasActionTypes.ADDING_CATEGORIAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case CategoriasActionTypes.ADDED_CATEGORIAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.categorias.push(action.payload.categorias.docs[0])
        if (draft.searchString) draft.foundcategorias.push(action.payload.categorias.docs[0])
        break

      case CategoriasActionTypes.REMOVE_CATEGORIA:
        draft.categorias.splice(
          draft.categorias.findIndex((categoria) => categoria._id === action.payload._id),
          1
        )
        break

      case CategoriasActionTypes.EDIT_CATEGORIAS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.categorias[draft.categorias.findIndex((categoria) => categoria._id === action.payload._id)] = action.payload
        break

      case CategoriasActionTypes.EDITED_CATEGORIAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.categorias[draft.categorias.findIndex((categoria) => categoria._id === action.payload._id)] = action.payload
        draft.foundcategorias[draft.foundcategorias.findIndex((categoria) => categoria._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ICategoriasState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  categorias: ICategoriasItem[]
  foundcategorias: ICategoriasItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
