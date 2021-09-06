import { CartContext } from 'contexts/CartContext'
import useProduct from 'hooks/useProduct'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import './components/styles/styleAll.css'

export default function ProductDetail({ match }) {
  const [product, isLoading] = useProduct(match.params.slug)
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <div className="container-xl text-light">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <ol className="breadcrumb" aria-label="breadcrumbs">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-light">
                    Products
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product && product.name}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                {isLoading && 'isLoading...'}
                {!isLoading && product && (
                  <div className="card-body">
                    <div className="row align-items-top">
                      <div className="col-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded zoom zoom-hover"
                        />
                      </div>
                      <div className="col">
                        <h2 className="h1 mb-1">
                          <span className="text-reset">{product.name}</span>
                        </h2>
                        <div className="mt-1">
                          <span className="badge">
                            {product.category?.name}
                          </span>
                        </div>
                        <div className="text-muted h2 mt-4">
                          Rp. {product.price}
                        </div>

                        <div className="mt-3">
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="6" cy="19" r="2" />
                              <circle cx="17" cy="19" r="2" />
                              <path d="M17 17h-11v-14h-2" />
                              <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ProductDetail.propTypes = {
  match: PropTypes.object,
}
