import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import { CategoriaServices, ICategoria } from '../../services/CategoriaServices';

import MapaApp from '../../components/MapaApp'
import { Platform, TextInput, View, StyleSheet, FlatList, TouchableOpacity, Touchable, Image, ListRenderItemInfo, Text } from 'react-native';

type buscaScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Busca>;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles';
import { Imagens } from '../../assets';
import style from '../../../storybook/stories/CenterView/style';
import { ImageBackground } from 'react-native';
import { fonts } from 'react-native-elements/dist/config';
import { padding } from '../../styles/mixins';
import ContentLoader, { Rect } from 'react-content-loader/native';



const Busca: React.FC = () => {



    const navigation = useNavigation<buscaScreenProp>();

    const [categorias, setCategorias] = useState({ produtos: [] as ICategoria[], servicos: [] as ICategoria[]});
    useEffect(() => {

        const fetchData = async () => {
            const responseProduto = await CategoriaServices.ListarPorTipo(1, 0, 10);
            const responseServico = await CategoriaServices.ListarPorTipo(2, 0, 10);

            var produtos = responseProduto.ok && responseProduto.data? responseProduto.data : [] as ICategoria[];
            var servicos = responseServico.ok && responseServico.data ? responseServico.data : [] as ICategoria[];

            setCategorias({ produtos, servicos });

            console.log("categorias => ", categorias);
        };
        fetchData();
    }, []);


    const renderItem = ({ item }: ListRenderItemInfo<ICategoria>) => {
        return (
            <TouchableOpacity style={styles.categoria} onPress={() => navigation.navigate(AppScreens.Lojas, { categoria: item })}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: item.foto == null ? Imagens.SEMIMAGEM : item.foto }}
                    resizeMode="cover"
                >
                        <Text style={styles.textoCategoria}>{item.nome}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    function renderItemFake() {

        return (
            <>
                {
                    [1, 2, 3].map((v) => {
                        return (
                            <View style={styles.categoria} key={v}>
                                <ContentLoader width="100%" height="100%">
                                    <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
                                </ContentLoader>
                            </View>
                        );
                    })
                }
            </>
        );

    }


    return (
        <>
            <View style={styles.container}>
                
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Procurar"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        style={{ flex: 1, padding: 0 }}
                    />
                    <Ionicons name="ios-search" size={20} />
                </View>
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', width: "48%" }}>
                        <Text style={styles.titulo}>Produtos</Text>
                        {categorias.produtos.length > 0 ?
                        <FlatList
                            data={categorias.produtos}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                        />
                            : <>{renderItemFake()}</>
                        }
                    </View>
                    <View style={{ flexDirection: 'column', width: "48%" }}>
                        <Text style={styles.titulo}>Serviços</Text>

                        {categorias.servicos.length > 0 ?
                            <FlatList
                                data={categorias.servicos}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                            : <>{renderItemFake()}</>
                        }
                    </View>
                </View>
            </View>
        </>
    );
}

export default Busca;



const styles = StyleSheet.create({

   

    container: {
        flex: 1,
        backgroundColor: Colors.BRANCO,
        paddingLeft: 15,
        paddingRight: 15,
    },
    searchBox: {
        marginTop: Platform.OS === 'ios' ? 15 : 0,
        marginBottom: 15,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: Colors.CINZA,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },

    categoria: {
        height: 100,
        marginBottom: 15,
        flexDirection: "row",
        backgroundColor: '#fff',
        
        borderRadius: 5,

        borderColor: Colors.CINZACLARO,
        borderWidth: 1,
    },
    image: {
        
        justifyContent: "flex-start",
        width: "100%",
        
    },

    textoCategoria: {
        color: Colors.PRETO,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10
        
    },

    titulo: {
        color: Colors.PRETO,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        width: "100%"

    }



    
});