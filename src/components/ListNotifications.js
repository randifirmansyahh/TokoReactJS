import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import './styles/styleListNotifikasi.css'

export default function ListNotifications() {
  const { notifications, getNotifications, handleReadMessage } =
    useContext(NotificationContext)

  const onRead = (id) => {
    handleReadMessage(id)
    ;async () => await getNotifications()
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
              <td>{notification.createdAt.substring(0, 10)}</td>
              <td>{notification.message}</td>
              <td>
                {notification.status == false ? (
                  <div className="btn-list">
                    <button
                      type="button"
                      className="btn btn-icon dibaca"
                      onClick={() => onRead(notification.id)}
                    >
                      Baca
                    </button>
                  </div>
                ) : (
                  <div className="btn-list">
                    <button
                      type="button"
                      className="btn btn-icon"
                      onClick={() => onRead(notification.id)}
                    >
                      Telah Dibaca
                    </button>
                  </div>
                )}
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
