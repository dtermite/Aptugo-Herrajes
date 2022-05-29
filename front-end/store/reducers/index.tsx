import { combineReducers } from 'redux'
import categoriasReducer, { ICategoriasState, initialCategoriasState } from './categoriasReducer'
import productosReducer, { initialProductosState, IProductosState } from './productosReducer'

export interface IState {
  categorias: ICategoriasState
  productos: IProductosState
}

export const initialState: IState = {
  categorias: initialCategoriasState,
  productos: initialProductosState,
}

export default combineReducers({
  categorias: categoriasReducer,
  productos: productosReducer,
})
