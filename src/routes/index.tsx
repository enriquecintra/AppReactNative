import React, { useContext } from 'react';
import MapaApp from '../components/MapaApp';
import AuthContext from '../contexts/auth';
import Chat from '../pages/chat';

import AuthRoutes from '../routes/auth.routes'
import AppMenu from './app.menu';
import AppRoutes from './app.routes';

const Routes = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <AppMenu /> : <AuthRoutes />;
    //return (<Chat />);
    //return (<MapaApp />);
}

export default Routes;