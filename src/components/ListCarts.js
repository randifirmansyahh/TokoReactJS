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
          className: 'btn btn-success',
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
                  {isLoading ? 'Loading' : 'Checkout'}
                </button>
              )}
            </th>
          </tr>
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
                  className="d-block zoom"
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
                    className="btn btn-icon zoom"
                    onClick={() => handleEditQuantity('+', cart)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon zoom"
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
                  <button className="btn btn-success">Cari Makanan</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>

        {carts.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={3} align="center">
                <div className="garis-total" />
                <strong>Total</strong>
                <div className="garis-total" />
              </td>
              <td>
                <div className="garis-total" />
                {getTotalQuantity()} pcs
                <div className="garis-total" />
              </td>
              <td colSpan={3}>
                <div className="garis-total" />
                Rp. {getTotalAmount()}
                <div className="garis-total" />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
