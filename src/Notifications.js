import ListNotifications from './components/ListNotifications'

export default function Carts() {
  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <ListNotifications />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
