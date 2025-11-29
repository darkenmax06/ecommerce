import { Link } from "react-router-dom"
import {ListOrdered, LogOut, Map, Package, PackagePlus, Tag, UserCircle2 } from "lucide-react"
import useUser from "../../hooks/useUser"

function SellerMenu (){
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
            <Link to="/myproducts" >
                <Package/>
                Mis productos
            </Link>
        </li>
        
        <li>
            <Link to="/myproducts/create" >
                <PackagePlus/>
                Crear producto
            </Link>
        </li>

        <li>
            <Link to="/targets" >
                <Tag/>
                Categorias
            </Link>
        </li>

        <li>
            <Link to="/shipping" >
                <Map/>
                Localidades
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

export default SellerMenu