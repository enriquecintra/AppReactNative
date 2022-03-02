import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/login/index';
import EsqueciMinhaSenha from '../pages/login/esqueciMinhaSenha/EsqueciMinhaSenha';
import PrimeiroAcesso from '../pages/login/primeiroAcesso/PrimeiroAcesso';
import { AuthScreens, AuthStackParamList } from './AuthStackParamList';
import ConfirmarCodigo from '../pages/login/confirmarCodigo/ConfirmarCodigo';
import AlterarSenha from '../pages/login/alterarSenha/AlterarSenha';

const AppStack = createStackNavigator<AuthStackParamList>();

const AuthRoutes = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }} >
            <AppStack.Screen name={AuthScreens.Login} component={Login} />
            <AppStack.Screen name={AuthScreens.EsqueciMinhaSenha} component={EsqueciMinhaSenha} />
            <AppStack.Screen name={AuthScreens.PrimeiroAcesso} component={PrimeiroAcesso} />
            <AppStack.Screen name={AuthScreens.ConfirmarCodigo} component={ConfirmarCodigo} />
            <AppStack.Screen name={AuthScreens.AlterarSenha} component={AlterarSenha} />
        </AppStack.Navigator>
    );
}

export default AuthRoutes;