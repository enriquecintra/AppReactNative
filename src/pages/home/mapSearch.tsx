import React, { useContext, useEffect, useState } from 'react';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import { CategoriaServices, ICategoria } from '../../services/CategoriaServices';

import MapaApp from '../../components/MapaApp'

type buscaMapaScreenProp = StackNavigationProp<AppStackParamList, AppScreens.BuscaMapa>;


const BuscaMapa: React.FC = () => {

    const [categorias, setCategorias] = useState([] as ICategoria[]);

    useEffect(() => {

        const fetchData = async (tipo: number) => {

            let cat = [] as ICategoria[];

            const response = await CategoriaServices.ListarPorTipo(1, 0, 10);
            const response2 = await CategoriaServices.ListarPorTipo(2, 0, 10);

            if (response.data)
                response.data.map((v, i) => cat.push(v));
            if (response2.data)
                response2.data.map((v, i) => cat.push(v));

            
            setCategorias(cat);


        };


        fetchData(1);

    }, [] as ICategoria[]);


    return (
        <>
            <MapaApp categorias={categorias} />
        </>
    );

}

export default BuscaMapa;
