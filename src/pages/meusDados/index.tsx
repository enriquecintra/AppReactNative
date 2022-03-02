import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth'; 
import FormDados from '../../components/FormDados';

export default function MeusDados() {

    const { user } = useContext(AuthContext);

    return (
        <>
            <FormDados
                {...user}
            />
        </>
    );
}