import useCheckout from 'hooks/useCheckout'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { AuthContext } from 'contexts/AuthContext'
import { formatNumber } from 'utils/number'
import { confirmAlert } from 'react-confirm-alert'
import CustomUI from './confirm-alert/CustomUI'
import './styles/styleListCarts.css'
import './styles/styleAll.css'

export default function ListCarts() {
  const {
    carts,
    getCart,
    getTotalAmount,
    getTotalQuantity,
    handleEditQuantity,
  } = useContext(CartContext)

  const { getNotification } = useContext(NotificationContext)

  const [handleCheckout, isLoading] = useCheckout()
  const { me } = useContext(AuthContext)

  const onCheckout = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: (
        <>
          <strong>Pastikan alamat pengiriman sudah sesuai?</strong>
          <div>{me.name}</div>
          <div>{me.email}</div>
          <div>{me.address}</div>
        </>
      ),
      buttons: [
        {
          label: 'Lanjutkan',
          className: 'btn btn-success btn-zoom btn-hover',
          onClick: async () => {
            await handleCheckout()
            getCart()
            getNotification()
          },
        },
      ],
      customUI: CustomUI,
    })
  }

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          {carts.length > 0 ? (
            <tr>
              <th width="30%" colSpan="2">
                Product
              </th>
              <th width="20%">Price</th>
              <th width="20%">Quantity</th>
              <th width="20%">Total</th>
              <th>
                {me && (
                  <button
                    type="button"
                    className="btn btn-success btn-zoom"
                    onClick={onCheckout}
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
                      <polyline points="9 11 12 14 20 6" />
                      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                    </svg>
                    {isLoading ? 'Loading' : 'Checkout'}
                  </button>
                )}
              </th>
            </tr>
          ) : null}
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id} className="bayangan">
              <td>
                <img
                  className="zoom-lumayan"
                  src={cart.product?.image}
                  width="50px"
                  alt=""
                />
              </td>
              <td>
                <Link
                  key={cart.id}
                  to={`/product/${cart.product.name.replace(/\s/g, '-')}`}
                  className="d-block text-blue zoom"
                >
                  {cart.product?.name}
                </Link>
              </td>
              <td>Rp. {formatNumber(cart.product?.price)}</td>
              <td>{formatNumber(cart.quantity)} pcs</td>
              <td>Rp. {formatNumber(cart.product?.price * cart.quantity)}</td>
              <td>
                <div className="btn-list">
                  <button
                    type="button"
                    className="btn btn-icon btn-zoom plus"
                    onClick={() => handleEditQuantity('+', cart)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-zoom minus"
                    onClick={() => handleEditQuantity('-', cart)}
                  >
                    -
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {carts.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                <br />
                <br />
                Yah keranjangmu kosong, ayo cari makanan favoritmu sekarang !
                <br />
                <br />
                <Link to="/">
                  <button
                    className="btn btn-dark btn-zoom"
                    style={{ width: 150 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 15 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="10" cy="10" r="7" />
                      <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                    Cari Makanan
                  </button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>

        {carts.length > 0 && (
          <tfoot>
            <tr className="bg-dark text-light">
              <td colSpan={3} align="center">
                <strong>Total</strong>
              </td>
              <td>{getTotalQuantity()} pcs</td>
              <td colSpan={3}>Rp. {getTotalAmount()}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
