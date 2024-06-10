import { routeNames } from '../config/route-name.config'
import Account from '../pages/Account/Account'
import Dashboard from '../pages/Dashboard/Dashboard'
import SignIn from '../pages/SignIn/SignIn'
import Tutor from '../pages/Tutor/Tutor'

export const routePaths = {
  public: [
    {
      path: routeNames.SignIn,
      element: <SignIn />,
    },
  ],
  private: [
    {
      path: routeNames.Home,
      element: <Dashboard />,
    },
    {
      path: routeNames.Tutor,
      element: <Tutor />,
    },
    {
      path: routeNames.Account,
      element: <Account />,
    },
  ],
}
