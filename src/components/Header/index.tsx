import React from 'react';
import { Text, View, Image, ImageBackgroundComponent } from 'react-native';
import style from '../../../storybook/stories/CenterView/style';
import { AuthScreens } from '../../routes/AuthStackParamList';
import {styles} from './styles';

interface Props {
    title?: string,
    pagina?: AuthScreens
}

export default function Header(props: Props) {
    return (
        <View  style={
            (props.pagina == AuthScreens.Login ||
                props.pagina == AuthScreens.EsqueciMinhaSenha ||
                props.pagina == AuthScreens.PrimeiroAcesso) ?
                styles.containerHeaderLogin :
                styles.container
        }>
            {(props.pagina == AuthScreens.Login ||
                props.pagina == AuthScreens.EsqueciMinhaSenha ||
                props.pagina == AuthScreens.PrimeiroAcesso) ?
                <Image resizeMode="contain" style={styles.logoHeaderLogin} source={require('../../assets/images/oppi-fundo-preto.png')} /> :
                <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/oppi-fundo-branco.png')} />
            }
        </View>
    );
}
