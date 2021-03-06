import { useContext, useState } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import './styles/styleListNotifikasi.css'
import './styles/styleAll.css'
import { Link } from 'react-router-dom'
import LoadingPage from './atom/LoadingPage'

export default function ListNotifications() {
  const [first, setFirst] = useState(true)

  setTimeout(() => setFirst(false), 500)

  const { notifications, getNotifications, handleReadMessage } =
    useContext(NotificationContext)

  const onRead = (id) => {
    handleReadMessage(id)
    ;async () => await getNotifications()
    setBoleh(true)
  }

  const [notif, setNotif] = useState([])

  const [boleh, setBoleh] = useState(true)

  setTimeout(() => {
    boleh ? setNotif(notifications) : null
  }, 100)

  const pilihan = (type) => {
    if (type == 'dibaca') {
      setBoleh(false)
      setNotif(notifications.filter((x) => x.status == true))
    } else if (type == 'belum') {
      setBoleh(false)
      setNotif(notifications.filter((x) => x.status == false))
    } else {
      setBoleh(true)
      setNotif(notifications)
    }
  }

  return (
    <>
      {first ? (
        <LoadingPage />
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-vcenter card-table">
              <thead>
                {notifications.length > 0 ? (
                  <tr>
                    <th width="15%">Tanggal</th>
                    <th width="10%">Jam</th>
                    <th width="60%">Pesan</th>
                    <th width="180px">
                      <select
                        id="tipe"
                        style={{ backgroundColor: '#112031', color: 'white' }}
                        className="form-select select-hover zoom"
                        onChange={(e) => pilihan(e.target.value)}
                      >
                        <option value="semua">Semua</option>
                        <option value="dibaca">Dibaca</option>
                        <option value="belum">Belum Dibaca</option>
                      </select>
                    </th>
                  </tr>
                ) : null}
              </thead>
              <tbody>
                {notif.map((notification) => (
                  <tr key={notification.id} className="bayangan">
                    <td>{notification.createdAt.substring(0, 10)}</td>
                    <td>{notification.createdAt.substring(11, 16)}</td>
                    <td>
                      {notification.status == false ? (
                        <h3 className="text-pesan-baru">Pesan baru</h3>
                      ) : (
                        <Link
                          to={`/transactions`}
                          className="text-blue d-block zoom"
                        >
                          {notification.message}. Klik untuk detail transaksi
                        </Link>
                      )}
                    </td>
                    <td>
                      {notification.status == false ? (
                        <div className="btn-list">
                          <button
                            type="button"
                            className="btn btn-icon btn-success ms-auto btn-hover btn-zoom"
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M7 12l5 5l10 -10" />
                                <path d="M2 12l5 5m5 -5l5 -5" />
                              </svg>
                            </div>
                            Baca
                          </button>
                        </div>
                      ) : (
                        <div className="btn-list">
                          <button
                            type="button"
                            className="btn telah-dibaca"
                            readOnly
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
                      <br />
                      <br />
                      Belum ada notifikasi nih, yuk checkout makanan favoritmu
                      sekarang !
                      <br />
                      <br />
                      <Link to="/carts">
                        <button className="btn btn-dark btn-zoom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1 7h-13" />
                          </svg>
                          CheckOut
                        </button>
                      </Link>
                    </td>
                  </tr>
                )}
                {notif.length === 0 && notifications.length > 0 && (
                  <tr>
                    <td colSpan={5} align="center">
                      <br />
                      <br />
                      Belum ada pesan, Silahkan pilih kategori lain
                      <br />
                      <br />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
