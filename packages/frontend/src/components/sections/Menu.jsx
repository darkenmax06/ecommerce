import { Link } from "react-router-dom"
import "./menu.css"
import { MenuIcon, ShoppingCart, User, X } from "lucide-react"
import { useState } from "react"
import Cart from "../modals/Cart"
import WithoutLoginMenu from "../modals/WithoutLoginMenu"
import useUser from "../../hooks/useUser"
import SellerMenu from "../modals/SellerMenu"
import BuyerMenu from "../modals/BuyerMenu"

function Menu (){
    const {user} = useUser()
    const [isToggle,setIsToggle] = useState(false)
    const [showMenu,setShowMenu] = useState({
        user: false,
        cart: false
    })

    const handleToggle = () => setIsToggle(!isToggle)

    return (
        <header className="menu">
            <div className="menu__container">
                <picture className="menu__logo">
                    <img src="/Logo.png" alt="" />
                </picture>

                <nav className="menu__nav">
                    <ul className={isToggle ? "active": ""} >
                        <li onClick={handleToggle} >
                            <Link to="/#hero" >
                                Inicio
                            </Link>
                        </li>

                        <li onClick={handleToggle} >
                            <Link to="/about" >
                                Sobre nosotros
                            </Link>
                        </li>

                        <li onClick={handleToggle} >
                            <Link to="/#products" >
                                Productos
                            </Link>
                        </li>

                        <li onClick={handleToggle} >
                            <Link to="/contact" >
                                Contacto
                            </Link>
                        </li>
                    </ul>

                    <div className="menu__actions">
                        <button className="menu__action" onClick={()=> setShowMenu(prev=> ({cart: false,user: !prev.user}))} >
                            <User/>
                        </button>

                        <button className="menu__action" onClick={()=> setShowMenu(prev=> ({user: false,cart: !prev.cart}))} >
                            <ShoppingCart/>
                        </button>

                        <button className="menu__btn" onClick={handleToggle} >
                            {
                                isToggle
                                ? <X/>
                                : <MenuIcon/>
                            }
                        </button>
                        {showMenu.user && 
                            (user == null
                                ? <WithoutLoginMenu/>
                                : ( user.type == "seller" ?  <SellerMenu/> : <BuyerMenu/> )
                            )
                        }
                        {showMenu.cart && <Cart/>}
                    </div>
                </nav>
            </div>
        </header>
    )
}


export default Menu