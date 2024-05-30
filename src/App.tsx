import React from "react";
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import newContacto from "./pages/newContacto";
import Nosotros from "./pages/Nosotros";
import Productos from "./pages/Products/Productos";
import Footer from "./components/Footer";
// import Usuario from "./pages/User/Usuario"
import EstatusEnvio from "./pages/User/EstatusEnvio"
import Ubicaciones from "./pages/User/Ubicaciones"
import FormUbicaciones from "./pages/User/FormUbicaciones";
import FormDetaFac from "./pages/User/FormDetaFac";
import ProductId from "./pages/Products/ProductId";
import shoppingCart from "./pages/shoppingCart/shoppingCart";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import editDirecciones from "./pages/User/editDirecciones";
import editDireccionFact from "./pages/User/editDireccionFact";
import EstatusEnvioAdministrador from "./pages/administrador/EstatusEnvioAdmin";
import HistPedidosAdmin from "./pages/administrador/HistPedidosAdmin";
import EditarProducto from "./pages/administrador/editarProducto";
import FormNvoProducto from "./pages/administrador/formNvoProducto";

import shopProducts from "./pages/ShopProduct/shopProducts";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Completeion from "./pages/ShopProduct/Completeion";
import PerfilUsuario from "./pages/PerfilUsuario";
import ocasionesProductos from "./pages/Products/ocasionesProductos";

import Carga from "./components/Carga";



function App() {

  const [loading, setLoading] = React.useState(true);

  const initialOptions = {
    "clientId":"Ac5z9jFzq7vM1OfhlHDJca7sGVhMmyfXSQeSwJE0nxoXboxS_6hSVVy1ownxLWjmXD89Ad66Ql3ivC2V",
    "currency":"MXN",
    "intent":"capture"
  }

  setTimeout(() => {
    setLoading(false);
  }, 3000);


  if (loading) {
    return <Carga />;
  }


  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Productos" Component={Productos}/>
          <Route path="/Producto/:id" Component={ProductId}/>
          <Route path="/Nosotros" Component={Nosotros}/>
          <Route path="/newContacto" Component={newContacto}/>
          <Route path="/Usuario/:id" Component={PerfilUsuario}/>
          <Route path="/EstatusEnvio" Component={EstatusEnvio}/>
          <Route path="/Ubicaciones" Component={Ubicaciones}/>
          <Route path="/FormUbicaciones" Component={FormUbicaciones}/>
          <Route path="/FormDetaFac" Component={FormDetaFac}/>
          <Route path="/shoppingCart" Component={shoppingCart}/>
          <Route path="/Login" Component={Login}/>
          <Route path="/SignIn" Component={ SignIn }/>
          <Route path="/shopProducts" Component={shopProducts}/>
          <Route path="/Completeion" Component={ Completeion }/>
          <Route path="/editDirecciones/:id" Component={editDirecciones} />
          <Route path="/editDireccionFact/:id" Component={editDireccionFact} />
          <Route path="/HistPedidosAdmin" Component={HistPedidosAdmin} />
          <Route path="/EstatusEnvioAdministrador" Component={EstatusEnvioAdministrador} />
          <Route path="/ocasion/:nombreOcasion/:id" Component={ocasionesProductos} />
          <Route path="/pantallaCarga" Component={Carga} />
          <Route path="/EditarProducto/:id" Component={EditarProducto} />
          <Route path="/FormNvoProducto" Component={FormNvoProducto} />
        </Routes>

        <Footer/>

      </BrowserRouter>
    </PayPalScriptProvider>

  )
}

export default App