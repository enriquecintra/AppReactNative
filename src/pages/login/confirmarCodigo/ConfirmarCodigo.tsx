import React, { useEffect, useState, useRef } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreens, AuthStackParamList } from '../../../routes/AuthStackParamList';
import { UsuarioServices } from "../../../services/UsuarioServices";
import Header from '../../../components/Header';
import { styles } from './styles';


interface Props {
    navigation: StackNavigationProp<AuthStackParamList, AuthScreens.ConfirmarCodigo>,
    route: RouteProp<AuthStackParamList, AuthScreens.ConfirmarCodigo>,
}

//export function ConfirmarCodigo({ navigate, getState }: confirmarCodigoScreenProp) {
const ConfirmarCodigo: React.FC<Props> = ({ navigation, route }) => {

    const tempo = 120;

    const [codigo, setCodigo] = useState('');

    const { token, irPara } = route.params;

    const [tokenAtual, setToken] = useState(token);


    const [num, setNum] = useState(tempo);
    let intervalRef = useRef<any>();

    const decreaseNum = () => setNum((prev) => {
        if (prev == 1) {
            clearInterval(intervalRef.current);
        }
        return prev - 1
    });

    const resetnum = () => {
        setNum(tempo)
        intervalRef.current = setInterval(decreaseNum, 1000);
    };

    useEffect(() => {

        intervalRef.current = setInterval(decreaseNum, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);


    function arrumarTimer() {
        var segundos = (num % 60).toString();
        if (segundos.length == 1)
            segundos = "0" + segundos;
        return (<>{parseInt((num / 60).toString())}:{segundos}</>);
    }


    function handleCodigoChange(codigo: string) { setCodigo(codigo); }

    async function handleConfirmarCodigoPress() {
        try {

            console.log("props =>", { token, irPara, tokenAtual });

            if (codigo.length < 6) throw new Error("Preencha o código com 6 digitos!");

            const response = await UsuarioServices.Confirmar(tokenAtual, parseInt(codigo));
            console.log("response =>", response);
            if (response.ok && response.data) {
                alert("Confirmação OK!!!");
                navigation.navigate(irPara, { token: response.data.token });
            }
            else
                alert(response.error.message);
        }
        catch (e: Error | any) {
            alert(e.message);
        }
    }

    async function handleReenviarPress() {
        try {
            const response = await UsuarioServices.ReenviarCodigo(token);
            //console.log(response);
            if (response.ok && response.data) {
                alert("Código reenviado!");
                setToken(response.data.token);
                resetnum();
                setCodigo('');
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
            <Header title="Primeiro Acesso" />
            <View style={styles.inputContainer} >
                <TextInput style={styles.input} onChangeText={handleCodigoChange} placeholder="Código" />

                <Text style={styles.title}>Código expira em: {arrumarTimer()}</Text>

                <TouchableOpacity style={styles.button} disabled={ num == 0 } onPress={() => handleConfirmarCodigoPress()}>
                    <Text>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleReenviarPress()}>
                    <Text>Reenviar Código</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate(AuthScreens.Login)}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default ConfirmarCodigo;
