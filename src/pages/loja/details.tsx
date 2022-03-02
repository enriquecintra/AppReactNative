import React, { useContext, useEffect, useState } from 'react';
import { Divider } from 'react-native-elements';
import { Text, View, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { IEndereco, ILoja, IProduto, ITelefone, LojaServices } from '../../services/LojaServices';
import { UsuarioServices } from '../../services/UsuarioServices';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styles';
import { Imagens } from '../../assets';
import AuthContext from '../../contexts/auth';
import ContentLoader, { Rect } from 'react-content-loader/native';
import StarRating from '../../components/StarRating';
import Loading from '../../components/Loading';

interface Props {
    navigation: StackNavigationProp<AppStackParamList, AppScreens.Loja>,
    route: RouteProp<AppStackParamList, AppScreens.Loja>,
}

//export function ConfirmarCodigo({ navigate, getState }: confirmarCodigoScreenProp) {
const Loja: React.FC<Props> = ({ navigation, route }) => {

    const { ajustaRecentes } = useContext(AuthContext);

    const { id } = route.params;
    const [loja, setLoja] = useState({ id: 0 } as ILoja);

    useEffect(() => {
        const fetchData = async () => {
            const response = await LojaServices.ObterPorId(id);
            console.log("Lojas =>", { r: response.data?.usuario });
            if (response.data) {
                let l = response.data;

                let quantidadeAvaliacoes = l.avaliacoes.length
                function add(accumulator: number, a: number) {
                    return accumulator + a;
                }
                const somaNota = l.avaliacoes.map((v) => { return v.nota }).reduce(add, 0);

                let mediaAvaliacoes = quantidadeAvaliacoes > 0 ? somaNota / quantidadeAvaliacoes : 0

                l.mediaAvaliacoes = mediaAvaliacoes;
                l.quantidadeAvaliacoes = quantidadeAvaliacoes;

                setLoja(l);
                ajustaRecentes(l);
            }
        };

        const salvarNavegacao = async () => {
            await UsuarioServices.SalvarNavegacao(id);
        };

        fetchData();
        salvarNavegacao();



    }, [] as ILoja[]);


    function montarEndereco(endereco: IEndereco) {

        let retorno = "Não informado";
        if (endereco) {
            retorno = endereco.logradouro + ", " + endereco.numero;
            if (endereco.complemento)
                retorno += " - " + endereco.complemento;
            retorno += " - " + endereco.bairro + " - " + endereco.cidade + " - " + endereco.uf;
        }
        return retorno;
    }
    function montarTelefone(telefones: ITelefone[]): React.ReactNode {

        let retorno = "Não informado";
        if (telefones && telefones.length > 0) {
            let telefone = telefones[0];
            retorno = "(" + telefone.ddd + ") " + telefone.numero;
            if (telefone.ramal)
                retorno += " - Ramal: " + telefone.ramal;
        }
        return retorno;
    }
    
    return (



        <View style={styles.container}>

            {loja.id == 0 ?
                <Loading show={true} />
                :
                <>

                    <View style={styles.containerCabecalho}>

                        <View style={styles.containerCabecalhoDados}>
                            <View style={[styles.logoCabecalhoDadosLoja]}>
                                <Image source={{ uri: loja.logo == null ? Imagens.SEMIMAGEM : loja.logo }} style={styles.imageLoja} />
                            </View>

                            <View style={styles.itemCabecalhoDadosLoja}>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {loja.nome}</Text>
                                {/*<Text style={styles.textoGeralDetalhe}>CNPJ: {loja.cnpj}</Text>*/}
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Endereço:</Text> {montarEndereco(loja.endereco)} sidws wjwbdeifcwepçidwipe </Text>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Teleofne:</Text> {montarTelefone(loja.telefones)}</Text>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {loja.usuario ? loja.usuario.email : "Não Informado"}</Text>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>{loja.mediaAvaliacoes?.toFixed(1)}</Text> <StarRating ratings={loja.mediaAvaliacoes as number} reviews={loja.quantidadeAvaliacoes as number} showLabel={true} /></Text>

                            </View>
                        </View>
                        <Divider orientation="horizontal" />
                        <View style={styles.containerCabecalhoDadosDescricao}>
                            <View style={{ width: "85%", padding: 10 }}>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Resumo:</Text> {loja.resumo}</Text>
                                <Text style={styles.textoGeralDetalhe}><Text style={{ fontWeight: 'bold' }}>Descrição:</Text> {loja.descricao}</Text>
                            </View>

                            <View style={{ alignSelf: 'center', paddingRight: 15 }}>
                                <MaterialIcons
                                    style={{ paddingRight: 0 }}
                                    name="chat"
                                    size={40}
                                    color={Colors.PURPLE}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerTitulo}>
                        <Text style={styles.title}>Nossos Produtos</Text>
                    </View>
                    <ScrollView css={{ top: 'always', horizontal: 'never' }}>

                        <View>
                            {
                                loja.produtos.map((v, i) => { return renderItem(v, i); })
                            }
                        </View>
                    </ScrollView>
                </>
            }
        </View>

    );

    function renderItem(produto: IProduto, i: number) {
        return (

            <View style={styles.containerProdutos} key={i + 1}>
                
                <View style={styles.itemProduto}>
                    <Text style={styles.textoNomeProdutoDetalhe}>{produto.nome}</Text>
                    <Text style={styles.textoDescricaoProdutoDetalhe}>{produto.resumo}</Text>
                    <Text style={styles.textoValorProdutoDetalhe}>R$ {produto.valor}</Text>
                </View>
                <View style={styles.containerImagemProduto} >
                    <Image source={{ uri: produto.produtoFotos.length > 0 ? produto.produtoFotos[0].foto.base64 : Imagens.SEMIMAGEM }} style={styles.imagemProduto} />
                </View>
                
            {/*    <View style={{ alignItems: 'flex-end' }} >*/}
            {/*        <MaterialIcons*/}
            {/*            style={{ paddingRight: 0 }}*/}
            {/*            name="arrow-forward"*/}
            {/*            size={50}*/}
            {/*            color={Colors.PURPLE}*/}
            {/*        />*/}
            {/*    </View>*/}
            </View>

        )
    }
}

export default Loja;



export const styles = StyleSheet.create({
    container: {
        flex: 1,

        
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.BRANCO

    },
    containerCabecalho: {
        borderRadius: 8,
        borderColor: Colors.PURPLE,
        borderWidth: 1,
        
        
    },
    containerCabecalhoDados: {
        
        flexDirection: 'row',
    },
    containerCabecalhoDadosDescricao: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    
    },
    logoCabecalhoDadosLoja: {
        flex: 1,
        padding: 10,
        paddingRight: 0,
        width: "25%"
    },

    itemCabecalhoDadosLoja: {

        padding: 10,
        //borderWidth: 1,
        //borderColor: Colors.PRETO,
        width: "75%"
        

        
    },
    
    imageLoja: {
        aspectRatio: 1,
        borderRadius: 30,
    },

    textoGeralDetalhe: {
        fontSize: 11,
        color: Colors.CINZAESCURO,
        

    },

    containerProdutos: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.CINZACLARO,
        flexDirection: 'row',
        
    },
    containerImagemProduto: {
        padding: 5
        
        },
    imagemProduto: {
        aspectRatio: 1,
        borderRadius: 0,
        width: 70
    },
    itemProduto: {
        flex: 1,
        padding: 10,
        paddingRight: 0,
        width: "80%",
        alignSelf: 'center'

    },

    textoNomeProdutoDetalhe: {
        fontSize: 14,
        color: Colors.CINZAESCURO
    },
    textoDescricaoProdutoDetalhe: {
        fontSize: 11,
        color: Colors.CINZADESCRICAO
    },
    textoValorProdutoDetalhe: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.CINZADESCRICAO
    },
    itemCabecalhoHome: {
        flex: 0.50,
        padding: 10,
        backgroundColor: Colors.ROSA
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.CINZA
    },
    containerTitulo: {
        color: Colors.BRANCO,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CINZACLARO,
        padding: 10
    }

});


