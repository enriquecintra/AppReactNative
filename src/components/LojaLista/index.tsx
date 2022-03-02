import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { ILoja } from '../../services/LojaServices';
import { Imagens } from '../../assets';
import ContentLoader, { Rect } from 'react-content-loader/native';
import StarRating from '../../components/StarRating';

interface Props {
    lojas: ILoja[]
}

type lojaScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Loja>;


const LojaLista: React.FC<Props> = (props: Props) => {

    const navigation = useNavigation<lojaScreenProp>();

    function renderItem(loja: ILoja, i: number) {

        let quantidadeAvaliacoes = loja.avaliacoes.length
        function add(accumulator: number, a: number) {
            return accumulator + a;
        }
        const somaNota = loja.avaliacoes.map((v) => { return v.nota }).reduce(add, 0);

        let mediaAvaliacoes = quantidadeAvaliacoes > 0 ? somaNota / quantidadeAvaliacoes : 0

        return (
            <TouchableOpacity style={styles.card} key={i} onPress={() => navigation.navigate(AppScreens.Loja, { id: loja.id })}>
                <View style={styles.cardImgWrapper}>
                    <Image
                        source={{ uri: loja.logo == null ? Imagens.SEMIMAGEM : loja.logo }}
                        resizeMode="cover"
                        style={styles.cardImg}
                    />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{loja.nome}</Text>
                    <StarRating ratings={mediaAvaliacoes as number} reviews={quantidadeAvaliacoes as number} />
                    <Text style={styles.cardDetails}>{loja.descricao}</Text>
                    <Text style={[styles.cardDetails, { paddingTop: 5 }]}>Telefone: {loja.telefones && loja.telefones.length > 0 ? "(" + loja.telefones[0].ddd + ") " + loja.telefones[0].numero : "Não Informado"}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    function renderItemFake() {

        return (
            <>
                {
                    [1, 2, 3].map((v) => {
                        return (
                            <View style={styles.card} key={v}>
                                <View style={styles.cardImgWrapper}>
                                    <ContentLoader width="100%" height="100">
                                        <Rect x="0" y="0" rx="8" ry="8" width="100" height="150" />
                                    </ContentLoader>
                                </View>
                                <View style={styles.cardInfo}>
                                    <ContentLoader width="100%" height="20">
                                        <Rect x="0" y="5" width="100%" height="10" />
                                    </ContentLoader>
                                    <StarRating ratings={0} reviews={0} />
                                    <ContentLoader width="100%" height="30">
                                        <Rect x="0" y="5" width="100%" height="10" />
                                        <Rect x="0" y="20" width="100%" height="10" />
                                    </ContentLoader>
                                </View>
                            </View>
                        );
                    })
                }
            </>
        );

    }

    return (
        <>
            {props.lojas.length == 0 ? renderItemFake() : props.lojas.map(renderItem)}</>
    );
}

export default LojaLista;



export const styles = StyleSheet.create({


    cardsWrapper: {
        width: '90%',
        alignSelf: 'center'

    },

    card: {
        height: 100,
        marginTop: 5,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    }
});