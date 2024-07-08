import { Navigate, useLocation } from 'react-router-dom'
import { routeNames } from '../config'
import { useSelector } from 'react-redux'

export function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const { pathname } = useLocation()

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to={routeNames.SignIn} replace state={{ redirect: pathname }} />
  )
}
