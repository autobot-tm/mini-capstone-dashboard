import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './private.route'
import MainLayout from '../hoc/MainLayout'
import { routePaths } from './path.route'
import AccountInfo from '../pages/Account/components/AccountInfo/AccountInfo'
import { ErrorPage } from '../pages/Error/ErrorPage'

export const AppRouter = () => {
  const protectRoute = (
    <PrivateRoute>
      <MainLayout />
      <AccountInfo />
    </PrivateRoute>
  )
  return (
    <BrowserRouter>
      <Routes>
        {routePaths.public.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route element={protectRoute}>
          <Route key={'*'} path={'*'} element={<ErrorPage />} />
        </Route>
        <Route element={protectRoute}>
          {routePaths.private.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
