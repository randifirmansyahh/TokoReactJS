import { Link } from 'react-router-dom'
import { AnimateOnChange } from 'react-animation'
import { useContext } from 'react'
import { CartContext } from 'contexts/CartContext'
import { AuthContext } from 'contexts/AuthContext'
import { NotificationContext } from './../contexts/NotificationContext'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './styles/styleHeader.css'

const Header = () => {
  const { getTotalQuantity } = useContext(CartContext)
  const { getTotalMessage } = useContext(NotificationContext)

  const { me } = useContext(AuthContext)
  const totalQuantity = getTotalQuantity()
  const totalMessage = getTotalMessage()
  return (
    <>
      <header className="navbar navbar-expand-md navbar-light d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <Link to="/">
              <img
                src="https://banner2.cleanpng.com/20190611/lpa/kisspng-logo-portable-network-graphics-image-brand-r-png-sorgusuna-uygun-resimleri-bedava-indir-5d0027f9775ea4.2689206515602913214889.jpg"
                alt="Tabler"
                style={{ borderRadius: '100%' }}
                className="navbar-brand-image px-2"
              />
            </Link>
            Toko Randi Firmansyah
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            {me && (
              <div className="nav-item dropdown d-none d-md-flex me-3">
                <ul>
                  <li style={{ float: 'right', listStyle: null }}>
                    <Link
                      to="/carts"
                      className="nav-link px-0 carts-icon"
                      data-bs-toggle="dropdown"
                      tabIndex="-1"
                      aria-label="Show notifications"
                    >
                      <AnimateOnChange
                        animationIn="bounceIn"
                        animationOut="bounceOut"
                        durationOut={500}
                      >
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
                        <span className="badge bg-red">{totalQuantity}</span>
                      </AnimateOnChange>
                    </Link>
                  </li>
                  <li style={{ float: 'right' }}>
                    {/* //TODO : notifikasi */}
                    <Link
                      to="/notifications"
                      className="nav-link px-0 carts-icon"
                      data-bs-toggle="dropdown"
                      tabIndex="-1"
                      aria-label="Show notifications"
                    >
                      <AnimateOnChange
                        animationIn="bounceIn"
                        animationOut="bounceOut"
                        durationOut={500}
                      >
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
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                          <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                        </svg>
                        <span className="badge bg-red">{totalMessage}</span>
                      </AnimateOnChange>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="nav-item d-none d-md-flex me-3">
              <div className="btn-list">
                {!me && (
                  <Link to="/login" className="btn btn-outline-white">
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
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>
                    Login
                  </Link>
                )}
              </div>
            </div>

            {me && (
              <div className="nav-item">
                <Link
                  to="/account"
                  className="nav-link d-flex lh-1 text-reset p-0"
                >
                  <div className="d-none d-xl-block ps-2">
                    <div>{me.name}</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
