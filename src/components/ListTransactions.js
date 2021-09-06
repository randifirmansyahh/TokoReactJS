import { format } from 'date-fns'
import useTransactions from 'hooks/useTransactions'
import { formatNumber } from 'utils/number'
import './styles/styleListTransactions.css'
import './styles/styleAll.css'
import { Link } from 'react-router-dom'

export default function ListTransactions() {
  const [transactions, isLoading] = useTransactions()

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          {transactions.length > 0 ? (
            <tr className="table-dark">
              <th width="200px">Date Transaction</th>
              <th>Items</th>
              <th>Total Items</th>
              <th>Total Prices</th>
              <th width="150px"></th>
            </tr>
          ) : null}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} align="center">
                Loading Transaction ...{' '}
              </td>
            </tr>
          )}
          {!isLoading &&
            transactions.map((transaction) => (
              <tr key={transaction.id} className="bayangan">
                <td>
                  {format(
                    new Date(transaction.createdAt),
                    'dd MMMM yyyy HH:ii',
                  )}
                </td>
                <td>
                  <ul>
                    {transaction.carts.map((cart) => (
                      <Link
                        key={cart.id}
                        to={`/product/${cart.product.name.replace(/\s/g, '-')}`}
                        className="d-block zoom text-blue"
                      >
                        <li>{cart.product.name}</li>
                      </Link>
                    ))}
                  </ul>
                </td>
                <td>
                  {formatNumber(
                    transaction.carts.reduce(
                      (acc, cart) => acc + cart.quantity,
                      0,
                    ),
                  )}{' '}
                  pcs
                </td>
                <td>
                  Rp.{' '}
                  {formatNumber(
                    transaction.carts.reduce(
                      (acc, cart) => acc + cart.quantity * cart.product.price,
                      0,
                    ),
                  )}
                </td>
                <td>
                  {transaction.status == 0 ? (
                    <h3 className="belum-dibayar">Belum dibayar</h3>
                  ) : (
                    <h3 className="menunggu-konfirmasi">Menunggu konfirmasi</h3>
                  )}
                </td>
              </tr>
            ))}

          {transactions.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                <br />
                <br />
                Belum ada makanan yang di checkout nih, yuk checkout makanan
                favoritmu sekarang !
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
        </tbody>
      </table>
    </div>
  )
}
