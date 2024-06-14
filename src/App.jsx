import { useEffect, useState } from 'react'
import { AppRouter } from './routers/app.route'
import { useDispatch } from 'react-redux'
import { useAuthSlice } from './store/slices/auth.slice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { actions: authActions } = useAuthSlice()

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        await dispatch(authActions.initState()).unwrap()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  return <>{!loading && <AppRouter />}</>
}

export default App
