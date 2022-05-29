import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import baseClasses from './layout.module.scss'

const Administracion: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('es')
  const theme = estilosmodulescss

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        <Sidebar color="Cyan" open={true}>
          <NavLink exact to="/" key="e7k2xnxP">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Inicio</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/categorias" key="GGF5kTi9">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Categorias</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/productos " key="34cn7IMg">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Productos</ListItemText>
            </ListItem>
          </NavLink>
        </Sidebar>
      </div>
    </React.Fragment>
  )
}

export default Administracion
