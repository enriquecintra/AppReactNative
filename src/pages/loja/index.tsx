import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import { ILoja, LojaServices } from '../../services/LojaServices';

import { Colors } from '../../styles';


import LojaLista from '../../components/LojaLista';
import { View } from 'react-native';

interface Props {
    navigation: StackNavigationProp<AppStackParamList, AppScreens.Lojas>,
    route: RouteProp<AppStackParamList, AppScreens.Lojas>,
}

const Lojas: React.FC<Props> = ({ route }) => {
    const { categoria } = route.params;
    const [lojas, setLojas] = useState([] as ILoja[]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await LojaServices.ListarPorCategoria(categoria.id, 0, 10);
            if (response.data) {
                setLojas(response.data);
            }
        };
        fetchData();
    }, [] as ILoja[]);
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titulo}>{categoria.nome}</Text>
            </View>
            <ScrollView>
                <LojaLista lojas={lojas} />
            </ScrollView>
        </View>
    );
}

export default Lojas;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BRANCO,
        padding: 15,
        height: "100%"
    },
    titulo: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' }
});