import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
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
      <div className={theme.pages}>
        <AppBar elevation={5} color="primary" position="sticky" title="">
          <Toolbar>
            <NavLink exact to="/" key="c5yxLmCN">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Inicio</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/catprod" key="mpT4u2Fg">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Catalogo de productos</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/administracion" key="3TyRuwfQ">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Administracion</ListItemText>
              </ListItem>
            </NavLink>
          </Toolbar>
        </AppBar>

        <div title="Main Area" className={theme.mainarea}>
          <Container disableGutters fixed maxWidth="xl">
            <div title="div - Imagen fondo">
              <picture>
                <img src="/img/interiorindependencia.png" alt="/img/interiorindependencia.png" width="100%" height="500" />
              </picture>
            </div>
          </Container>
        </div>

        <div title="Redes Sociales" className={theme.socials}>
          <a target="_blank" href="https://www.instagram.com/">
            <picture>
              <img src="/img/instagramLogo.svg" alt="/img/instagramLogo.svg" width="30" height="30" />
            </picture>
          </a>

          <a target="_blank" href="https://web.whatsapp.com/">
            <picture>
              <img src="/img/whatsappLogo.svg" alt="/img/whatsappLogo.svg" width="30" height="30" />
            </picture>
          </a>

          <a target="_blank" href="https://www.facebook.com/">
            <picture>
              <img src="/img/facebookLogo.svg" alt="/img/facebookLogo.svg" width="30" height="30" />
            </picture>
          </a>

          <a target="_blank" href="https://www.linkedin.com/feed/">
            <picture>
              <img src="/img/linkedinLogo.svg" alt="/img/linkedinLogo.svg" width="30" height="30" />
            </picture>
          </a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
