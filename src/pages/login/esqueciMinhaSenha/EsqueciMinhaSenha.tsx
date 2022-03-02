import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Header from "../../../components/Header"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreens, AuthStackParamList } from '../../../routes/AuthStackParamList';
import { UsuarioServices } from '../../../services/UsuarioServices';
import { styles } from './styles';
import ButtonComponent from '../../../components/Button';

type esqueciScreenProp = StackNavigationProp<AuthStackParamList, AuthScreens.EsqueciMinhaSenha>;

export default function EsqueciMinhaSenha() {

    const navigation = useNavigation<esqueciScreenProp>();

    const [login, setLogin] = useState('');
    function handleLoginChange(login: string) { setLogin(login); }
    async function handleLoginPress() {
        try {
            try {
                if (login.length == 0) throw new Error("Informe o login!");
                const response = await UsuarioServices.EsqueciMinhaSenha(login);
                if (response.ok && response.data)
                    navigation.navigate(AuthScreens.ConfirmarCodigo, { token: response.data.token, irPara: AuthScreens.AlterarSenha });
                else
                    alert(response.error.message);
            }
            catch (e: Error | any) {
                alert(e.message);
            }

        } catch (error) {

        }
    }
    return (
        <>
            <Header pagina={AuthScreens.Login} />
            
            <View style={styles.container} >
                <View style={styles.inputContainer} >
                    <TextInput style={styles.input} placeholder="Digite seu email" onChangeText={handleLoginChange} keyboardType="email-address" textContentType="emailAddress" />
                    <ButtonComponent
                        actionPress={handleLoginPress}
                        value="Enviar"
                        nomeestilo="textoBotaoPurble"
                    />
                    <ButtonComponent
                        actionPress={() => navigation.navigate(AuthScreens.Login)}
                        value="Voltar"
                        nomeestilo="textoBotaoPurble"
                    />
                </View>
            </View>
        </>
    );
}
