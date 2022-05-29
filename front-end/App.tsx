import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Productos = React.lazy(() => import('./Pages/productos '))
const Categorias = React.lazy(() => import('./Pages/categorias'))
const Administracion = React.lazy(() => import('./Pages/administracion'))
const Catalogodeproductos = React.lazy(() => import('./Pages/catprod'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/productos ',
      name: 'Productos ',
      component: Productos,
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: Categorias,
    },
    {
      path: '/administracion',
      name: 'Administracion',
      component: Administracion,
    },
    {
      path: '/catprod',
      name: 'Catalogo de productos',
      component: Catalogodeproductos,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
