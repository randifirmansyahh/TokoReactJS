import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import './styles/styleListNotifikasi.css'
import './styles/styleAll.css'
import { Link } from 'react-router-dom'

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
            <th width="15%">Tanggal</th>
            <th width="10%">Jam</th>
            <th width="60%">Pesan</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id} className="bayangan">
              <td>{notification.createdAt.substring(0, 10)}</td>
              <td>{notification.createdAt.substring(11, 16)}</td>
              <td>
                {notification.status == false ? (
                  <h3 className="text-pesan-baru">~ Pesan baru</h3>
                ) : (
                  <Link to={`/transactions`} className="d-block">
                    {notification.message}. Klik untuk detail transaksi
                  </Link>
                )}
              </td>
              <td>
                {notification.status == false ? (
                  <div className="btn-list">
                    <button
                      type="button"
                      className="btn btn-icon dibaca"
                      onClick={() => onRead(notification.id)}
                    >
                      <div className="icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 12l5 5l10 -10" />
                          <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                      </div>
                      Baca
                    </button>
                  </div>
                ) : (
                  <div className="btn-list">
                    <button type="button" className="btn telah-dibaca" readOnly>
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
                <br />
                <br />
                Belum ada notifikasi nih, yuk checkout makanan favoritmu
                sekarang !
                <br />
                <br />
                <Link to="/carts">
                  <button className="btn btn-success">CheckOut</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
