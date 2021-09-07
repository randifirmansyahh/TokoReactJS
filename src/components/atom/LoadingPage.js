import Loader from 'react-loader-spinner'

const LoadingPage = () => {
  return (
    <div className="container" style={{ marginTop: 40, marginBottom: 40 }}>
      <div className="d-flex justify-content-center">
        <Loader type="BallTriangle" color="#112031" height="100" width="100" />
      </div>
    </div>
  )
}

export default LoadingPage
