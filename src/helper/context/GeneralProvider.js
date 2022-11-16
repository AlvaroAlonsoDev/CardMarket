import React from 'react'
import { ItemsProvider } from './ItemsProvider'
import { ApiProvider } from './ApiProvider'

export const GeneralProvider = ({children}) => {
    return (
        //? Añadir el alert que nos enseño Juan(esta en el canal de discord la web)
        <>
            <ItemsProvider>
                <ApiProvider>{children}</ApiProvider>
            </ItemsProvider>
        </>
    )
}
