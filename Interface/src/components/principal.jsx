import '../App.css'
import { useEffect, useState } from 'react'
import { notesRequest } from '../api/auth'
import Cookies from 'js-cookie'
import Sidebar from './sidebarComponents/Sidebar'
import MainContent from '../MainContent'

export function MainPage() {
  const [historialVisible, setHistorialVisible] = useState(false)
  const [folderVisible, setFolderVisible] = useState(false)

  const toggleHistorial = () => {
    setHistorialVisible(!historialVisible)
  }
  const toggleFolder = () => {
    setFolderVisible(!folderVisible)
  }

  const [todos, setTodos] = useState([])
  const data = Cookies.get('token')

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await notesRequest({ token: data })
        setTodos(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (data) getNotes()
  }, [])

  return (
    <div className="PrincipalPage">
      <section className="Aside">
        <Sidebar
          toggleHistorial={toggleHistorial}
          toggleFolder={toggleFolder}
        />
      </section>
      <section className="main-content">
        <MainContent historialVisible={historialVisible} folderVisible={folderVisible} />
      </section>
    </div>
  )
}
