import React, { useContext, useEffect } from 'react';
import { Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthContext from '../../contexts/auth';
import { styles } from "../home/styles";
import { ILoja, LojaServices } from '../../services/LojaServices';
import { Colors } from '../../styles';
import AnuncioCarousel from '../../components/AnuncioCarousel';
import { UsuarioServices } from '../../services/UsuarioServices';
import TextLink from '../../components/TextLink';
import { Imagens } from '../../assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LojaLista from '../../components/LojaLista';

type homeScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Home>;


const Home: React.FC = () => {

    const { user, recentes, setRecentes } = useContext(AuthContext);
    const navigation = useNavigation<homeScreenProp>();

    useEffect(() => {
        setRecentes([]);
        const fetchData = async () => {
            const responseRecentes = await UsuarioServices.Recentes(0, 10);

            if (responseRecentes.data) {
                var l = responseRecentes.data.map((v) => v.loja)
                setRecentes(l);
            }
        };

        fetchData();

    }, [] as ILoja[]);


    return (
        <>
            <View style={[styles.cabecalho]}>
                <View style={styles.cabecalhoItem}><Text style={styles.cabecalhoTexto}>Olá {user.nome}!!</Text></View>
                <View style={styles.cabecalhoItem}><Text style={[styles.cabecalhoTexto, { textAlign: "right", alignContent: "flex-end" }]}>Plano: Live</Text></View>
            </View>
            <View style={styles.container}>


                <AnuncioCarousel />
                <View style={{ paddingTop: 10, backgroundColor: Colors.BRANCO }}>
                    <Text style={[styles.texto, { marginBottom: 5 }]}>Visto Recentemente</Text>
                </View>
                <ScrollView >
                    <SafeAreaView css={{ top: 'always', horizontal: 'never' }}>
                        <View style={styles.cardsWrapper}>
                            <LojaLista lojas={recentes} />
                        </View>
                    </SafeAreaView>
                </ScrollView>

                <SafeAreaView >

                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity style={[styles.botao, { width: "55%" }]} onPress={() => navigation.navigate(AppScreens.Busca)}>
                            <Text style={[styles.texto, styles.textoBotao]}>
                                <MaterialIcons name="handyman" size={15} /> Produtos / Serviços
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.botao, { width: "30%" }]} onPress={() => navigation.navigate(AppScreens.BuscaMapa)}>
                            
                            <Text style={[styles.texto, styles.textoBotao]}>
                                <MaterialCommunityIcons name="map-search" size={15} /> Mapa
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.texto}>Ainda não é um fornecedor?</Text>
                        <Text style={styles.texto}>Venha Fazer parte do grupo de fornecedores.</Text>
                        <TextLink
                            value="Saiba Mais"
                            action={() => navigation.navigate(AppScreens.SobreSerFornecedor)}
                            style={styles.linkSaibaMais}
                        ></TextLink>

                    </View>
                </SafeAreaView>
            </View>

        </>
    );
}

export default Home;

