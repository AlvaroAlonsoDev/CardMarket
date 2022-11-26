//? Poner bien el FRONT al poner mal la password
//? RRUTAS PRIVADAS


//*  Cupon
//? Al hacer una compra borrar la cantidad de ofertas dependiendo de que compro
//* Agregar producto nuevo con un post
//* Editas las ofertas realizadas METHOD PUT
//? Añadir la ultima vez que se edito o cambio la password
//? Al editar el perfil volver a preguntar la contraseña y verificar datos
// Cuando haces log que te informe para rellenar otro form con la direccion y demas //! DONE
// Cuando compras tienes que limpiar el local que has comprado //! DONE
// Arreglar el precio total con la cantidad de productos //! DONE
// Agregar fecha de registro y mostrarlo en el profile //! DONE
// Arreglar precio total y añadir iva DINAMICO //! DONE
// Seccion para cambiar tu username pass..//! DONE
// Arreglar bug con el login .find      //! DONE
// Arreglar precio total                //! DONE
// Comprobar que no haya usuarios==     //! DONE
// Comprobar que no haya user =         //! DONE
// Encriptar pass                       //! DONE
// Lista de pedidos realizados          //! DONE
// Añadir funcionalidad a las compras   //! DONE
// Borrar de 1 en 1                     //! DONE
// Borrar las offers METHOD DELETE      //! DONE
// Carrito asociado al user logeado     //! DONE
// Fix bugg con user = carrito          //! DONE
// Mostras ofertas que no tengan id=user//! DONE
// Fix bugg !comprar = offer            //! DONE
// Poner el total del carrito €         //! DONE
// Arreglar el boton de añadir          //! DONE
// añdir la cantidad del "amount"       //! DONE
// Al añadir al carrito la cantidad     //! DONE
// No añadir mas que el stock           //! DONE
// form numeros recoger en numeros      //! DONE
// Arreglar el navBar                   //! DONE
// Crear nueva Offers                   //! DONE
// Quitar el pass al logearse           //! DONE
// Añadir offers                        //! DONE
// Crear page checkout                  //! DONE
// Crear page profile                   //! DONE
// Añadir pages de users(offersIn)      //! DONE
// Funcionalidad Register               //! DONE
// Funcionalidad Login                  //! DONE
// Borrar items del carrito             //! DONE
// Añadir las alertas de Juan           //! DONE
// Funcionalidad Buscador               //! DONE

//? especie de alerta diciendo que se ha procesado el pedido y navegar al home o whaterever
// PODEMOS USAR SWEET ALERT 

import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function CircularIntegration() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef < number > ();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    Accept terms
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}