import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import Button from '@mui/material/Button'
import orange from '@mui/material/colors/orange'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addCategorias, editCategorias, loadCategorias, removeCategoria, searchCategorias } from '../store/actions/categoriasActions'
import { ICategoriasItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: orange,
  },
})

const Categorias: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDatacategorias = {
    nombreCategoria: '',
  }
  const [categoriasdata, setcategoriasData] = React.useState<any>(initialDatacategorias)
  const handlecategoriasChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setcategoriasData({
      ...categoriasdata,
      [name]: value,
    })
  }
  const categoriasData = useSelector((state: IState) => state.categorias)
  const [lang, setlang] = React.useState<any>('es')
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForcategorias = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [Buscarcategorialoadoptions, setBuscarcategorialoadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performBuscarcategoriaload = (options) => {
    dispatch(options.searchString ? searchCategorias(options) : loadCategorias(options))
  }
  React.useEffect(() => {
    performBuscarcategoriaload({
      ...Buscarcategorialoadoptions,
    })
  }, [Buscarcategorialoadoptions])
  const [dialogCategoriasAction, setdialogCategoriasAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchCategorias(options) : loadCategorias(options))
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

                <Typography variant="h4">Detalle de categorias</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar categoria"
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForcategorias}
                    />

                    <LocalAddDialog
                      isOpen={dialogCategoriasAction !== ''}
                      onOpen={() => setdialogCategoriasAction('add')}
                      onSave={() => setdialogCategoriasAction('')}
                      onClose={() => setdialogCategoriasAction('')}
                      action={dialogCategoriasAction}
                      addOptions={{ title: 'Agregar categoria', text: 'Ingresar nueva categoria', button: 'Agregar' }}
                      editOptions={{ title: 'Editar categoria', text: 'Actualizar datos de categoria', button: 'Editar' }}
                      removeOptions={{ title: 'Borrar', text: 'Borrar categoria', button: 'Borrar' }}
                      saveDataHandler={(data: ICategoriasItem) => {
                        if (dialogCategoriasAction === 'delete') {
                          dispatch(removeCategoria(data))
                        } else {
                          dialogCategoriasAction === 'add' ? dispatch(addCategorias(data)) : dispatch(editCategorias(data))
                        }
                      }}
                      color="primary"
                      data={categoriasdata}
                      initialData={initialDatacategorias}
                      setData={setcategoriasData}
                      allowMultipleSubmit={dialogCategoriasAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="nombreCategoria"
                        type="text"
                        fullWidth
                        className={'field_nombreCategoria'}
                        variant="standard"
                        value={categoriasdata.nombreCategoria || ''}
                        onChange={handlecategoriasChange('nombreCategoria')}
                        error={categoriasData?.errField === 'nombreCategoria'}
                        helperText={categoriasData?.errField === 'nombreCategoria' && categoriasData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['nombreCategoria', 'Actions']}
                      tableData={categoriasData.foundcategorias.length ? categoriasData.foundcategorias : (categoriasData.categorias as any)}
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
                      <Field value={(fieldData: any) => fieldData.nombreCategoria} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setcategoriasData(e.element)
                            setdialogCategoriasAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeCategoria(e.element))
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

export default Categorias
