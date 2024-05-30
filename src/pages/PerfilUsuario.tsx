import React from 'react';
import UsuarioAdmin from './administrador/UsuarioAdmin';
import Usuario from './User/Usuario';


const PerfilUsuario = () => {

    const [showPassword, setShowPassword] = React.useState(true);



    React.useEffect(() => {
        const storedUserName = sessionStorage.getItem("userlogIn");
        if (storedUserName) {
            const userCredential = JSON.parse(storedUserName);
            userCredential.tipoUsuario ==  "vedendor" ? setShowPassword(true):setShowPassword(false);
        }
    }, []);

    return (

        <>
            {

                showPassword ? (
                    <UsuarioAdmin/>
                ):(
                    <Usuario />
                )
            }
        </>


    )
};

export default PerfilUsuario;