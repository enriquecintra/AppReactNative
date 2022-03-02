import React, { useState } from 'react';

import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreens, AuthStackParamList } from '../../../routes/AuthStackParamList';
import { UsuarioServices } from "../../../services/UsuarioServices";
import Header from '../../../components/Header';
import { styles } from './styles';

type primeiroAcessoScreenProp = StackNavigationProp<AuthStackParamList, AuthScreens.PrimeiroAcesso>;

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, AuthScreens.AlterarSenha>,
    route: RouteProp<AuthStackParamList, AuthScreens.AlterarSenha>,
}

const AlterarSenha: React.FC<Props> = ({ navigation, route }) => {

    const { token } = route.params;

    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

    function handleSenhaChange(senha: string) { setSenha(senha); }
    function handleSenhaConfirmacaoChange(senhaConfirmacao: string) { setSenhaConfirmacao(senhaConfirmacao); }

    async function handlePrimeiroAcessoPress() {
        try {
            if (senha != senhaConfirmacao) throw new Error("As senhas não são iguais!");

            const response = await UsuarioServices.AlterarSenha(senha, token);
            
            //console.log(response);
            if (response.ok && response.data) {
                alert("Senha Alterada com sucesso!!!");
                navigation.navigate(AuthScreens.Login);
            }
            else
                alert(response.error.message);
        } 
        catch (e: Error | any) {
            alert(e.message);
        }
    }

    return (
        <>
            <Header title="Alterar Senha" />
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.inputContainer} >
                    <TextInput style={styles.input} onChangeText={handleSenhaChange} placeholder="Senha" />
                    <TextInput style={styles.input} onChangeText={handleSenhaConfirmacaoChange} placeholder="Repita a senha" />
                    <TouchableOpacity style={styles.button} onPress={() => handlePrimeiroAcessoPress()}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate(AuthScreens.Login)}>
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

export default AlterarSenha;