import Loader from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="container">
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: '25%' }}
      >
        <Loader type="Bars" color="#112031" height="100" width="100" />
      </div>
    </div>
  )
}

export default Loading
