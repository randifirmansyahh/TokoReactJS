import Header from './Header'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import Footer from './Footer'
import './styles/styleAll.css'

const Layout = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Navigation />
      <div className="page-wrapper pisah">{props.children}</div>
      <Footer />
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Layout
