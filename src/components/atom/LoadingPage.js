import Loader from 'react-loader-spinner'

const LoadingPage = () => {
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="row row-cards">
          <div className="col-12 bg-white">
            <div
              className="container"
              style={{ marginTop: 40, marginBottom: 40 }}
            >
              <div className="d-flex justify-content-center">
                <Loader
                  type="ThreeDots"
                  color="#112031"
                  height="100"
                  width="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
