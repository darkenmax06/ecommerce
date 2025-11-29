import Footer from "../sections/Footer";
import Menu from "../sections/Menu";


function Layout ({children}) {
  return (
    <>
      <Menu/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout