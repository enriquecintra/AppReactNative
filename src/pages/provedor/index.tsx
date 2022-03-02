import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Header from "../../components/Header"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { styles } from './styles';
import { IProvedor, ProvedorServices } from '../../services/ProvedorServices';
import AuthContext from '../../contexts/auth';
import Loading from '../../components/Loading';

type provedorScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Provedor>;


export default function Provedor() {

    const { user, signOut, setProvedor } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const response = await ProvedorServices.ListarPorUsuario(user.id);
            //console.log("Provedores =>", { response, user });
            if (response.data)
               setLista(response.data);
            setLoading(false);
        };
        fetchData();
        

    }, [] as IProvedor[]);

    const [lista, setLista] = useState([] as IProvedor[]);

    const navigation = useNavigation<provedorScreenProp>();

    const listarProvedoresPorUsuario = (lista: IProvedor[]) => {
            return (
                <View>
                    {
                        lista.map((v, i) => {
                            return (
                                <View key={i} style={styles.listaProvedor}>
                                    <Text style={styles.textoListaProvedor} onPress={() => {
                                        navigation.navigate(AppScreens.Home);
                                        setProvedor(v);
                                    }
                                    }>{v.razaoSocial}</Text>
                                </View>
                            );
                        })
                    }
                    <Loading show={loading} />
                </View>
            );
    };

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.containerInformativo}>
                <Text style={styles.textoInformativo}>Selecione um Provedor</Text>
            </View>
            {listarProvedoresPorUsuario(lista)}
        </View>
    );
}
