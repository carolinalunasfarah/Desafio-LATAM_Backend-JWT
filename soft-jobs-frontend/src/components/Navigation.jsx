import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../contexts/Context'

const Navigation = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const logout = () => {
    setDeveloper()
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <>
          <Link to='/register' className='btn m-1 register-btn'>Register</Link>
          <Link to='/login' className='btn login-btn'>Log in</Link>
        </>
      )
    }

    return (
      <>
        <Link to='/profile' className='btn m-1 btn-light'>Profile</Link>
        <button onClick={logout} className='btn btn-danger'>Log out</button>
      </>
    )
  }

  return (
    <nav className='navbar'>
      <span className='logo'>SJ</span>
      <div className='opciones'>
        <span className='me-3'>
          <Link to='/'>Home<i className='fa-solid fa-house ms-2' /></Link>
        </span>
        {isLogin()}
      </div>
    </nav>
  )
}

export default Navigation
