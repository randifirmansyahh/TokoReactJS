import useProduct from './hooks/useProduct'
import PropTypes from 'prop-types'
import { useState } from 'react'
import LoadingPage from './components/atom/LoadingPage'

export default function DetailProduct({ match }) {
  const [product, isLoading] = useProduct(match.params.slug)

  const [first, setFirst] = useState(true)

  setTimeout(() => setFirst(false), 500)

  return (
    <>
      {first ? (
        <Loading />
      ) : (
        <>
          <h3>Halaman Detail Product {match.params.slug}</h3>
          {isLoading && 'isLoading...'}
          {!isLoading && product && (
            <>
              <img src={product.image} width="120px" alt="" />
              <h4>{product.name}</h4>
              <h4>${product.price}</h4>
            </>
          )}
        </>
      )}
    </>
  )
}

DetailProduct.propTypes = {
  match: PropTypes.any,
}
