import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/home/index';
import Provedor from '../pages/provedor';
import MeusDados from '../pages/meusDados';
import Loja from '../pages/loja/details';
import Lojas from '../pages/loja/index';
import SobreSerFornecedor from '../pages/SobreSerFornecedor/index';
import { AppScreens, AppStackParamList } from './AppStackParamList';
import Busca from '../pages/home/search';
import BuscaMapa from '../pages/home/mapSearch';

const AppStack = createStackNavigator<AppStackParamList>();

const AppRoutes = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }} >
            <AppStack.Screen name={AppScreens.Provedor} component={Provedor} />
            <AppStack.Screen name={AppScreens.Home} component={Home} />
            <AppStack.Screen name={AppScreens.Busca} component={Busca} />
            <AppStack.Screen name={AppScreens.BuscaMapa} component={BuscaMapa} />
            <AppStack.Screen name={AppScreens.MeusDados} component={MeusDados} />
            <AppStack.Screen name={AppScreens.Loja} component={Loja} />
            <AppStack.Screen name={AppScreens.Lojas} component={Lojas} />
            <AppStack.Screen name={AppScreens.SobreSerFornecedor} component={SobreSerFornecedor} />
        </AppStack.Navigator>
    );
}

export default AppRoutes;