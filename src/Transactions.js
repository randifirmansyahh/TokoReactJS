import ListTransactions from './components/ListTransactions'

export default function Transaction() {
  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <ListTransactions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
