import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constans'

const Home = () => {
  const { setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Welcome to <span className='fw-bold'>Soft Jobs</span>
      </h1>
      <h4>
        The place were all Juniors Developer <br /> could get experience
      </h4>
    </div>
  )
}

export default Home
