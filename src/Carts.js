import ListCarts from './components/ListCarts'

export default function Carts() {
  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <ListCarts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
