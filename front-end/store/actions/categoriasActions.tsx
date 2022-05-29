import { ICategoriasItem, IpaginatedCategorias } from '../models'

export enum CategoriasActionTypes {
  SEARCH_CATEGORIAS = 'categorias/search',
  SEARCHING_CATEGORIAS = 'categorias/searching',
  FOUND_CATEGORIAS = 'categorias/found',
  SEARCHING_CATEGORIAS_FAILED = 'categorias/searching_failed',

  LOAD_CATEGORIAS = 'categorias/load',
  LOADING_CATEGORIAS = 'categorias/loading',
  LOADED_CATEGORIAS = 'categorias/loaded',
  LOADING_CATEGORIAS_FAILED = 'categorias/loading_failed',

  ADD_CATEGORIAS = 'categorias/add',
  ADDING_CATEGORIAS = 'categorias/adding',
  ADDED_CATEGORIAS = 'categorias/added',
  ADDING_CATEGORIAS_FAILED = 'categorias/adding_failed',

  REMOVE_CATEGORIA = 'categorias/remove',
  REMOVING_CATEGORIA = 'categorias/removing',
  REMOVED_CATEGORIA = 'categorias/removed',
  REMOVING_CATEGORIA_FAILED = 'categorias/removing_failed',

  EDIT_CATEGORIAS = 'categorias/edit',
  EDITING_CATEGORIAS = 'categorias/editing',
  EDITED_CATEGORIAS = 'categorias/edited',
  EDITING_CATEGORIAS_FAILED = 'categorias/editing_failed',
}

export function searchCategorias(searchOptions: TSearchOptions | string, keep?: boolean): ISearchCategoriasAction {
  return {
    type: CategoriasActionTypes.SEARCH_CATEGORIAS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingCategorias(): ISearchingCategoriasAction {
  return {
    type: CategoriasActionTypes.SEARCHING_CATEGORIAS,
  }
}

export function foundCategorias(categorias: IpaginatedCategorias, keep?: boolean): IFoundCategoriasAction {
  return {
    type: CategoriasActionTypes.FOUND_CATEGORIAS,
    keep: keep,
    payload: {
      categorias,
    },
  }
}

export function searchingCategoriasFailed(): ISearchingCategoriasFailedAction {
  return {
    type: CategoriasActionTypes.SEARCHING_CATEGORIAS_FAILED,
  }
}

export function loadCategorias(loadOptions: TSearchOptions): ILoadCategoriasAction {
  return {
    type: CategoriasActionTypes.LOAD_CATEGORIAS,
    loadOptions: loadOptions,
  }
}

export function loadingCategorias(): ILoadingCategoriasAction {
  return {
    type: CategoriasActionTypes.LOADING_CATEGORIAS,
  }
}

export function loadedCategorias(categorias: IpaginatedCategorias): ILoadedCategoriasAction {
  return {
    type: CategoriasActionTypes.LOADED_CATEGORIAS,
    payload: {
      categorias,
    },
  }
}

export function loadingCategoriasFailed(): ILoadingCategoriasFailedAction {
  return {
    type: CategoriasActionTypes.LOADING_CATEGORIAS_FAILED,
  }
}

export function addCategorias(categoria: ICategoriasItem): IAddCategoriasAction {
  return {
    type: CategoriasActionTypes.ADD_CATEGORIAS,
    payload: categoria,
  }
}

export function addingCategorias(): IAddingCategoriasAction {
  return {
    type: CategoriasActionTypes.ADDING_CATEGORIAS,
  }
}

export function addedCategorias(categorias: IpaginatedCategorias): IAddedCategoriasAction {
  return {
    type: CategoriasActionTypes.ADDED_CATEGORIAS,
    payload: {
      categorias,
    },
  }
}

export function addingCategoriasFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingCategoriasFailedAction {
  return {
    type: CategoriasActionTypes.ADDING_CATEGORIAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeCategoria(categoria: ICategoriasItem): IRemoveCategoriaAction {
  return {
    type: CategoriasActionTypes.REMOVE_CATEGORIA,
    payload: categoria,
  }
}

export function removingCategoria(): IRemovingCategoriaAction {
  return {
    type: CategoriasActionTypes.REMOVING_CATEGORIA,
  }
}

export function removedCategoria(): IRemovedCategoriaAction {
  return {
    type: CategoriasActionTypes.REMOVED_CATEGORIA,
  }
}

export function removingCategoriaFailed(): IRemovingCategoriaFailedAction {
  return {
    type: CategoriasActionTypes.REMOVING_CATEGORIA_FAILED,
  }
}

export function editCategorias(categoria: ICategoriasItem): IEditCategoriasAction {
  return {
    type: CategoriasActionTypes.EDIT_CATEGORIAS,
    payload: categoria,
  }
}

export function editingCategorias(): IEditingCategoriasAction {
  return {
    type: CategoriasActionTypes.EDITING_CATEGORIAS,
  }
}

export function editedCategorias(categorias: ICategoriasItem): IEditedCategoriasAction {
  return {
    type: CategoriasActionTypes.EDITED_CATEGORIAS,
    payload: categorias,
  }
}

export function editingCategoriasFailed(): IEditingCategoriasFailedAction {
  return {
    type: CategoriasActionTypes.EDITING_CATEGORIAS_FAILED,
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

export interface ISearchCategoriasAction {
  type: CategoriasActionTypes.SEARCH_CATEGORIAS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingCategoriasAction {
  type: CategoriasActionTypes.SEARCHING_CATEGORIAS
}

export interface IFoundCategoriasAction {
  type: CategoriasActionTypes.FOUND_CATEGORIAS
  keep?: boolean
  payload: {
    categorias: IpaginatedCategorias
  }
}

export interface ISearchingCategoriasFailedAction {
  type: CategoriasActionTypes.SEARCHING_CATEGORIAS_FAILED
}

export interface ILoadCategoriasAction {
  type: CategoriasActionTypes.LOAD_CATEGORIAS
  loadOptions: TSearchOptions
}

export interface ILoadingCategoriasAction {
  type: CategoriasActionTypes.LOADING_CATEGORIAS
}

export interface ILoadedCategoriasAction {
  type: CategoriasActionTypes.LOADED_CATEGORIAS
  payload: {
    categorias: IpaginatedCategorias
  }
}

export interface ILoadingCategoriasFailedAction {
  type: CategoriasActionTypes.LOADING_CATEGORIAS_FAILED
}

export interface IAddCategoriasAction {
  type: CategoriasActionTypes.ADD_CATEGORIAS
  payload: ICategoriasItem
}

export interface IAddingCategoriasAction {
  type: CategoriasActionTypes.ADDING_CATEGORIAS
}

export interface IAddedCategoriasAction {
  type: CategoriasActionTypes.ADDED_CATEGORIAS
  payload: {
    categorias: IpaginatedCategorias
  }
}

export interface IAddingCategoriasFailedAction {
  type: CategoriasActionTypes.ADDING_CATEGORIAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveCategoriaAction {
  type: CategoriasActionTypes.REMOVE_CATEGORIA
  payload: ICategoriasItem
}

export interface IRemovingCategoriaAction {
  type: CategoriasActionTypes.REMOVING_CATEGORIA
}

export interface IRemovedCategoriaAction {
  type: CategoriasActionTypes.REMOVED_CATEGORIA
}

export interface IRemovingCategoriaFailedAction {
  type: CategoriasActionTypes.REMOVING_CATEGORIA_FAILED
}

export interface IEditCategoriasAction {
  type: CategoriasActionTypes.EDIT_CATEGORIAS
  payload: ICategoriasItem
}

export interface IEditingCategoriasAction {
  type: CategoriasActionTypes.EDITING_CATEGORIAS
}

export interface IEditedCategoriasAction {
  type: CategoriasActionTypes.EDITED_CATEGORIAS
  payload: ICategoriasItem
}

export interface IEditingCategoriasFailedAction {
  type: CategoriasActionTypes.EDITING_CATEGORIAS_FAILED
}

export type CategoriasAction =
  | ISearchCategoriasAction
  | ISearchingCategoriasAction
  | IFoundCategoriasAction
  | ISearchingCategoriasFailedAction
  | ILoadCategoriasAction
  | ILoadingCategoriasAction
  | ILoadedCategoriasAction
  | ILoadingCategoriasFailedAction
  | IAddCategoriasAction
  | IAddingCategoriasAction
  | IAddedCategoriasAction
  | IAddingCategoriasFailedAction
  | IRemoveCategoriaAction
  | IRemovingCategoriaAction
  | IRemovedCategoriaAction
  | IRemovingCategoriaFailedAction
  | IEditCategoriasAction
  | IEditingCategoriasAction
  | IEditedCategoriasAction
  | IEditingCategoriasFailedAction
