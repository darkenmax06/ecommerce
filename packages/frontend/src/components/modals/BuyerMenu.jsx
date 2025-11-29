import { Link } from "react-router-dom"
import { CreditCard, ListOrdered,LogOut, UserCircle2 } from "lucide-react"
import useUser from "../../hooks/useUser"

function BuyerMenu (){
    const {logoutUser} = useUser()

  const handleLogout = () => logoutUser()

  return (
    <ul className="user-menu">
        <li>
            <Link to="/me" >
                <UserCircle2/>
                Mi informacion
            </Link>
        </li>

        <li>
            <Link to="/myorders" >
                <ListOrdered/>
                Mis ordenes
            </Link>
        </li>

        <li className="menu__logout"  onClick={handleLogout} >
          <LogOut/>
          cerrar sesion
        </li>
    </ul>
  )
}

export default BuyerMenu