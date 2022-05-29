import HomeIcon from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadProductos, searchProductos } from '../store/actions/productosActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Catalogodeproductos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('es')
  const theme = estilosmodulescss
  const allproducts = useSelector((state: IState) => state.productos).productos
  const productosData = useSelector((state: IState) => state.productos)
  const dispatch = useDispatch()
  const [Loadproductosloadoptions, setLoadproductosloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadproductosload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performLoadproductosload({
      ...Loadproductosloadoptions,
    })
  }, [Loadproductosloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        <Container maxWidth="md">
          <div title="Main Area" className={theme.mainarea}>
            <div title="div - Volver">
              <NavLink to="/">
                <Button startIcon={<HomeIcon />}>Inicio</Button>
              </NavLink>
            </div>

            <div title="div - Titulo productos" className={theme.tituloprod}>
              <Typography variant="h4">Catalogo de productos</Typography>
            </div>

            <div title="div - Contenedor productos" className={theme.marcoprod}>
              {allproducts.map((itemprod, index) => {
                return (
                  <React.Fragment key={index}>
                    <div title="div - Cuadro por imagenes" className={theme.productos}>
                      <div title="div - imagenes" className={theme.imagenes}>
                        <picture>
                          <img src={`/img/${itemprod.imagenProducto}`} alt={`/img/${itemprod.imagenProducto}`} width="200" height="200" />
                        </picture>
                      </div>

                      <div title="div - texto de producto" className={theme.textoprod}>
                        <div title="div - nombre producto">
                          <Typography variant="h6">{itemprod.nombreProducto}</Typography>
                        </div>

                        <div title="div - descripcion producto">
                          <Typography variant="caption">{itemprod.descripcionProducto}</Typography>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Catalogodeproductos
