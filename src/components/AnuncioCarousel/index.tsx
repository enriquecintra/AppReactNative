import * as React from 'react';
import { View, Image, ListRenderItemInfo, Pressable, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnuncioServices, IAnuncio } from '../../services/AnuncioServices';
import { styles } from '../AnuncioCarousel/styles';
import { Imagens} from '../../assets'
import { useEffect, useState } from 'react';

import ContentLoader from 'react-content-loader/native';
import { Rect } from 'react-native-svg'

type anuncioCarouselScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Loja>;


import Swiper from 'react-native-swiper'

const AnuncioCarousel: React.FC = () => {


    const [anuncios, setAnuncios] = useState([] as IAnuncio[]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await AnuncioServices.Listar();
            //console.log("Anuncios =>", { response });
            if (response.data)
                setAnuncios(response.data);
        };

        fetchData();

    }, [] as IAnuncio[]);


    const navigation = useNavigation<anuncioCarouselScreenProp>();


    async function handleGoTo(id: number) {
        navigation.navigate(AppScreens.Loja, { id });
    }

    function renderItem(item: IAnuncio, i: number) {
        return (
            <View style={styles.slide} key={i}>
                <Pressable
                    onPress={() => handleGoTo(item.id)}
                >
                <Image
                    source={{ uri: item.anuncioFotos[0].foto.base64 == null ? Imagens.SEMIMAGEM : item.anuncioFotos[0].foto.base64 }} 
                    
                    resizeMode="cover"
                    style={styles.sliderImage}
                />
                </Pressable>
            </View>
            
        );
    }
    return (
        <>
            {anuncios.length == 0 ?
                <ContentLoader width="100%" height={110} >
                    <Rect x="0" y="10" rx="8" ry="8" width="100%" height="100" />
                </ContentLoader>
                :
                <View style={styles.sliderContainer}>
                    <Swiper
                        autoplay
                        horizontal={true}
                        height={100}
                        activeDotColor="#FF6347">
                        {anuncios.map(renderItem)}
                    </Swiper>
                </View>
            }
        </>
    );
}

export default AnuncioCarousel;


