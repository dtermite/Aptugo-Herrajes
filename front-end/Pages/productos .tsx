import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import Button from '@mui/material/Button'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import FileUpload from '../components/FileUpload/FileUpload'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addProductos, editProductos, loadProductos, removeProducto, searchProductos } from '../store/actions/productosActions'
import { IProductosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Productos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataproductos = {
    nombreProducto: '',
    descripcionProducto: '',
    imagenProducto: '',
    categoriaProducto: null,
  }
  const [productosdata, setproductosData] = React.useState<any>(initialDataproductos)
  const handleproductosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setproductosData({
      ...productosdata,
      [name]: value,
    })
  }
  const productosData = useSelector((state: IState) => state.productos)
  const [lang, setlang] = React.useState<any>('es')
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForproductos = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogProductosAction, setdialogProductosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const categoriasAutocompleteData = useSelector((state: IState) => state.categorias)
  const [categoriaProductoOptions, setcategoriaProductoOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchcategoriaProductoCategorias = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'nombreCategoria', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/categorias/search/', { params: searchOptions }).then((result) => {
      setcategoriaProductoOptions(
        result.data.docs.map((categoria) => {
          return { label: categoria.nombreCategoria, value: categoria._id }
        })
      )
    })
  }
  const [categoriaProductoValue, setcategoriaProductoValue] = React.useState(null)
  React.useEffect(() => {
    if (!productosdata.categoriaProducto) return undefined
    const asArray = Array.isArray(productosdata.categoriaProducto) ? productosdata.categoriaProducto : [productosdata.categoriaProducto]
    setcategoriaProductoValue(asArray.map((item) => ({ label: item.nombreCategoria, value: item._id })))
  }, [productosdata.categoriaProducto])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="md">
              <div title="Head" className={theme.tableHeading}>
                <NavLink to="/administracion">
                  <Button startIcon={<LinkIcon />}>Administracion</Button>
                </NavLink>

                <Typography variant="h4">Detalle de Productos</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Busqueda por nombre de producto"
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForproductos}
                    />

                    <LocalAddDialog
                      isOpen={dialogProductosAction !== ''}
                      onOpen={() => setdialogProductosAction('add')}
                      onSave={() => setdialogProductosAction('')}
                      onClose={() => setdialogProductosAction('')}
                      action={dialogProductosAction}
                      addOptions={{ title: 'Agregar producto', text: 'Ingresar nuevo producto', button: 'Agregar' }}
                      editOptions={{ title: 'Editar producto', text: 'Actualizar datos de producto', button: 'Editar' }}
                      removeOptions={{ title: 'Borra', text: 'Borrar', button: 'Borra' }}
                      saveDataHandler={(data: IProductosItem) => {
                        if (dialogProductosAction === 'delete') {
                          dispatch(removeProducto(data))
                        } else {
                          dialogProductosAction === 'add' ? dispatch(addProductos(data)) : dispatch(editProductos(data))
                        }
                      }}
                      color="primary"
                      data={productosdata}
                      initialData={initialDataproductos}
                      setData={setproductosData}
                      allowMultipleSubmit={dialogProductosAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="nombreProducto"
                        type="text"
                        fullWidth
                        className={'field_nombreProducto'}
                        variant="standard"
                        value={productosdata.nombreProducto || ''}
                        onChange={handleproductosChange('nombreProducto')}
                        error={productosData?.errField === 'nombreProducto'}
                        helperText={productosData?.errField === 'nombreProducto' && productosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="descripcionProducto"
                        type="text"
                        fullWidth
                        className={'field_descripcionProducto'}
                        variant="standard"
                        value={productosdata.descripcionProducto || ''}
                        onChange={handleproductosChange('descripcionProducto')}
                        error={productosData?.errField === 'descripcionProducto'}
                        helperText={productosData?.errField === 'descripcionProducto' && productosData.errMessage}
                      />

                      <FileUpload
                        label="imagenProducto"
                        value={productosdata.imagenProducto}
                        onChange={handleproductosChange('imagenProducto')}
                        variant="standard"
                      />

                      <Autocomplete
                        value={categoriaProductoValue}
                        onType={typeInSearchcategoriaProductoCategorias}
                        onChange={(newValue) =>
                          handleproductosChange('categoriaProducto')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, nombreCategoria: item.label }))
                              : []
                          )
                        }
                        loading={categoriasAutocompleteData.loadingStatus === 'loading'}
                        options={categoriaProductoOptions}
                        label="categoriaProducto"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['nombreProducto', 'descripcionProducto', 'imagenProducto', 'categoriaProducto', 'Actions']}
                      tableData={productosData.foundproductos.length ? productosData.foundproductos : (productosData.productos as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.nombreProducto} />

                      <Field value={(fieldData: any) => fieldData.descripcionProducto} />

                      <Field value={(fieldData: any) => (fieldData.imagenProducto ? <img src={`/img/${fieldData.imagenProducto}`} /> : <div />)} />

                      <Field value={(fieldData: any) => (fieldData.categoriaProducto ? fieldData.categoriaProducto.nombreCategoria : '')} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setproductosData(e.element)
                            setdialogProductosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeProducto(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Productos
