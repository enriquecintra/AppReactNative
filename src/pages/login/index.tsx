import React, { useContext, useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';
import Header from "../../components/Header";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthContext from "../../contexts/auth";
import { AuthScreens, AuthStackParamList } from '../../routes/AuthStackParamList';
import { styles } from './styles';
import FormLogin from '../../components/FormLogin';


type loginScreenProp = StackNavigationProp<AuthStackParamList, AuthScreens.Login>;

export default function Login() {

    const { signed, user, token, signIn } = useContext(AuthContext);
    const navigation = useNavigation<loginScreenProp>();
    const [isSelectedLogin, setSelectionLogin] = useState(false);
    const [login, setLogin] = useState('enrique.cintra@gmail.com');
    const [senha, setSenha] = useState('123');
    //const [login, setLogin] = useState('');
    //const [senha, setSenha] = useState('');
    function handleLoginChange(login: string) { setLogin(login); }
    function handleSenhaChange(senha: string) { setSenha(senha); }

    const [loading, setLoading] = useState(false);

    async function handleLoginPress() {
        setLoading(true);
        try {
            await signIn(login.toLowerCase(), senha);
        } catch (e: Error | any) {
            setLoading(false);
            setTimeout(() => alert(e.message), 1);
        }
    }
    return (
        <>
            {/* <Header title="Teste" /> */}
            <View style={styles.container}>

            <Header  pagina={AuthScreens.Login} />

            <FormLogin
                changeLogin={handleLoginChange}
                changeSenha={handleSenhaChange}
                checkboxChecked={isSelectedLogin}
                actionPressCheckBox={() => { setSelectionLogin(!isSelectedLogin) }}
                loginFunction={handleLoginPress}
                pressEsqueciSenhaLink={() => navigation.navigate(AuthScreens.EsqueciMinhaSenha)}
                pressPrimeiroAcessoLink={() => navigation.navigate(AuthScreens.PrimeiroAcesso)}
                loading={loading}
                placeholdeSenha ={"Senha"}
            />
            </View>
        </>
    );
}