import './App.css'
import { Route, Routes,Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import useUser from './hooks/useUser'
import MainLoader from './components/loaders/MainLoader'
import NotFoundPage from './Pages/NotFoundPage'
import Layout from './components/elements/Layout'
const EditProducts = lazy(()=> import("./Pages/EditProducts"))
const Signin = lazy(()=> import("./Pages/Signin"))
const Login = lazy(()=> import("./Pages/Login"))
const Index = lazy(()=> import('./Pages/Index')) 
const Product = lazy(()=> import('./Pages/Product'))
const Contact = lazy(()=> import('./Pages/Contact'))
const Products = lazy(()=> import('./Pages/Products'))
const About = lazy(()=> import('./Pages/About'))
const Me = lazy(()=> import('./Pages/Me'))
const EditMe = lazy(()=> import('./Pages/EditMe'))
const Orders = lazy(()=> import('./Pages/Orders'))
const CreateProducts = lazy(()=> import('./Pages/CreationProducts'))
const Myproducts = lazy(()=> import('./Pages/MyProducts'))
const CreateTarget = lazy(()=> import('./Pages/CreateTarget'))
const Targets = lazy(()=> import('./Pages/Targets'))
const EditTarget = lazy(()=> import('./Pages/EditTarget'))
const Order = lazy(()=> import('./Pages/Order'))
const Shipping = lazy(()=> import('./Pages/Shipping'))

function App() {
  const {user} = useUser()

  return (
    <Layout>
       <Suspense fallback={<MainLoader/>} >
        <Routes>

          <Route path='/' element={ <Index/> } />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />

          <Route path='/login' element={<Login/>} />
          <Route path='/signin' element={<Signin/>} />

          <Route path='/products' element={user ? <Products/> : <Navigate to="/" /> } />
          <Route path='/products/:id' element={<Product/>} />
          <Route path='/myproducts' element={user && user.type == "seller" ? <Myproducts/> : <Navigate to="/" /> } />
          <Route path='/myproducts/create' element={user && user.type == "seller" ? <CreateProducts/> : <Navigate to="/" /> } />
          <Route path='/myproducts/edit/:productId' element={user && user.type == "seller" ? <EditProducts/> : <Navigate to="/" /> } />

          <Route path='/shipping' element={user ? <Shipping/> : <Navigate to="/" /> } />

          <Route path='/targets' element={user && user.type == "seller" ? <Targets/> : <Navigate to="/" /> } />
          <Route path='/targets/create/' element={user && user.type == "seller" ? <CreateTarget/> : <Navigate to="/" /> } />
          <Route path='/targets/edit/:targetId' element={user && user.type == "seller" ? <EditTarget/> : <Navigate to="/" /> } />

          <Route path='/me' element={user ? <Me/> : <Navigate to="/" /> } />
          <Route path='/me/edit' element={user ? <EditMe/> : <Navigate to="/" /> } />

          <Route path='/myorders' element={user ? <Orders/> : <Navigate to="/" /> } />
          <Route path='/myorders/:orderId' element={user ? <Order/> : <Navigate to="/" /> } />

          <Route path='*' element={ <NotFoundPage /> } />
          
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
