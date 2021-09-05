import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import notificationService from './../services/notification'
export const NotificationContext = createContext()

export default function NotificationContextProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  async function getData() {
    const data = await notificationService.getAll()
    setNotifications(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const SetAsRead = async (message) => {
    try {
      await notificationService.update(message)
      getData()
      document.querySelector('body').scrollIntoView({
        behavior: 'smooth',
      })
    } catch (err) {
      if (err.response.status === 401) {
        history.push({
          pathname: '/login',
          state: { message: 'Silakan login terlebih dahulu' },
        })
      }
    }
  }

  alert(notifications)

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getNotification: getData,
        SetAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
