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
      <table className="table table-vcenter card-table table-striped">
        <thead>
          <tr>
            <th width="300px">Date Transaction</th>
            <th>Items</th>
            <th>Total Items</th>
            <th>Total Prices</th>
            <th width="150px"></th>
          </tr>
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
                      <li key={cart.id}>{cart.product.name}</li>
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
                Belum ada barang yang di checkout nih, yuk checkout makanan
                favoritmu sekarang !
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
