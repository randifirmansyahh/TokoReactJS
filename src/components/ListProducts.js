import { CartContext } from 'contexts/CartContext'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import './styles/styleListProduct.css'
import './styles/styleAll.css'

function ListProducts({ products, isLoading }) {
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <div className="container-xl">
        <div className="row row-cards">
          {isLoading && 'Loading products... '}
          {!isLoading &&
            products.map((product) => (
              <div className="col-6 col-lg-3 zoom-product" key={product.id}>
                <div className="card card-sm">
                  <Link to={`/product/${product.slug}`} className="d-block">
                    <img src={product.image} className="card-img-top" />
                  </Link>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <div>{product.name}</div>
                        <div className="text-muted">Rp. {product.price}</div>
                      </div>
                      <div className="ms-auto">
                        <span className="badge">{product.category?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-dark ms-auto btn-hover btn-zoom"
                        onClick={() => addToCart(product)}
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
                        Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

ListProducts.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
export default ListProducts
