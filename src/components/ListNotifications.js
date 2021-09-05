import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

export default function ListNotifications() {
  const { notifications, getNotifications, setAsRead } =
    useContext(NotificationContext)

  const onRead = (id) => {
    setAsRead(id)
    getNotifications()
  }

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          <tr>
            <th width="20%">Tanggal</th>
            <th width="60%">Pesan</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.createdAt}</td>
              <td>{notification.message}</td>
              <td>
                <div className="btn-list">
                  <button
                    type="button"
                    className="btn btn-icon"
                    onClick={() => onRead(notification.id)}
                  >
                    Read
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {notifications.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                Tidak ada notifikasi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
