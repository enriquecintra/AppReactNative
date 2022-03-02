////import * as React from 'react';

////import MapView, { Circle, Marker } from 'react-native-maps';

////import { StyleSheet, Text, View, Dimensions } from 'react-native';

//////import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
//////import Geolocation from 'react-native-geolocation-service';

////import * as Permissions from 'expo-permissions';
////import * as Location from 'expo-location';


////import { Platform } from 'react-native';
////import { useEffect, useState } from 'react';
////import { StackNavigationProp } from '@react-navigation/stack';
////import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
////import { RouteProp } from '@react-navigation/native';

////interface ILocalizacao {
////    latitude: number,
////    longitude: number
////}

////interface Props {
////    navigation: StackNavigationProp<AppStackParamList, AppScreens.Loja>,
////    route: RouteProp<AppStackParamList, AppScreens.Loja>,
////}

////const MapaApp: React.FC<Props> = ({ navigation, route }) => {


////    const [errorMsg, setErrorMsg] = useState(''); // será utilizado para armazenar alguma mensagem de erro, caso ocorra
////    const [coords, setCoords] = useState({} as ILocalizacao);   //vai armazenar a localização atual

////    useEffect(() => {
////        (async () => {
////            let { status } = await Location.requestForegroundPermissionsAsync();
////            console.log("Localizacao Status =>", status);
////            if (status !== 'granted') {
////                setErrorMsg('Permission to access location was denied');
////                return;
////            }

////            let location = await Location.getCurrentPositionAsync({});

////            console.log("Localizacao =>", location);

////            setCoords({
////                latitude: location.coords.latitude,
////                longitude: location.coords.longitude,
////            });
////        })();
////    }, []);

////    return (
////        <View style={styles.container}>
////            {coords.latitude == undefined ? <></> :
////                <MapView style={styles.map}
////                    initialRegion={{
////                        latitude: coords.latitude,// - 23.521194,
////                        longitude: coords.longitude,//-46.542470,
////                        latitudeDelta: 0.00922,
////                        longitudeDelta: 0.00421,
////                    }}
                    
////                >

////                    <Circle
////                        //key={marker.id}
////                        center={{
////                            latitude: coords.latitude,
////                            longitude: coords.longitude
////                        }}
////                        radius={1000}
////                        strokeColor={'rgba(100,100,100,.5)'} fillColor={'rgba(100,100,100,.5)'}
////                        zIndex={2}
////                        strokeWidth={1}
////                        miterLimit={0}
////                    />

////                    <Marker
////                        //onPress={onPress}
////                        tracksViewChanges={false}	//propriedade que melhora muito a performance do nosso aplicativo, mantendo os marcadores fixados no mapa e eliminando a renderização continua.
////                        //key={mark._id}	//como temos vários marcadores, devemos adicionar um id para cada
////                        coordinate={{	//aqui nós inserimos a localização do marcador no mapa
////                            latitude: coords.latitude,
////                            longitude: coords.longitude
////                        }}
////                        title={`Minha Casa`}	//título do marcador
////                    >


////                    </Marker>
////                </MapView>

////            }
////        </View>
////    );
////}

////export default MapaApp;

////const styles = StyleSheet.create({
////  container: {
////    flex: 1,
////    backgroundColor: '#fff',
////    alignItems: 'center',
////    justifyContent: 'center',
////  },
////  map: {
////    width:375,
////    height: 250,
////  },
////});


import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    ActivityIndicator,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { markers, mapDarkStyle, mapStandardStyle } from './models';
import StarRating from '../StarRating';

import { useTheme } from '@react-navigation/native';
import { ICategoria } from '../../services/CategoriaServices';
import Icone from '../Icone';
import { LojaServices } from '../../services/LojaServices';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


import Loading from '../../components/Loading';
import { Colors } from '../../styles';

//type Props {
//    navigation: StackNavigationProp<AppStackParamList, AppScreens.Loja>,
//   route: RouteProp<AppStackParamList, AppScreens.Loja>,
//}

type Props = {
    categorias: ICategoria[],

}

interface IMarker {
    coordinate: ICoordenada,
    title: string,
    description: string,
    image: string,
    rating: number,
    reviews: number
}
interface ICoordenada {
    latitude: number,
    longitude: number
}




const MapaApp: React.FC<Props> = (props) => {

    const initialMapState = {
        markers: [] as IMarker[],
        region: {
            latitude: -23.550164466,
            longitude: -46.633664132,
            latitudeDelta: 0.04072262100681456,
            longitudeDelta: 0.02762541174888611,
        } as Region
    };



    const [region, setRegion] = useState(initialMapState.region);
    const [markers, setMarkers] = useState(initialMapState.markers);


    const [showBtnProcurarNaArea, setShowBtnProcurarNaArea] = useState(true); // será utilizado para armazenar alguma mensagem de erro, caso ocorra
    const [showProcurandoCoordenada, setShowProcurandoCoordenada] = useState(true); // será utilizado para armazenar alguma mensagem de erro, caso ocorra


    const [errorMsg, setErrorMsg] = useState(''); // será utilizado para armazenar alguma mensagem de erro, caso ocorra


    const [loading, setLoading] = useState(true);

    const Procurar = async () => {

        try {
            setShowBtnProcurarNaArea(true);
            setLoading(true);
            const response = await LojaServices.ListarPorLocalizacao(region.latitude, region.longitude, 5);
            if (response.data) {
                var markersData = [] as IMarker[];
                response.data.map((v, i) => {
                    if (markers.filter(x => x.coordinate.latitude == v.latitude && x.coordinate.longitude == v.longitude && x.title == v.nome).length == 0)
                        markersData.push({
                            coordinate: {
                                latitude: v.latitude as number,
                                longitude: v.longitude as number,
                            },
                            title: v.nome,
                            description: v.descricao,
                            image: v.logo,
                            rating: v.mediaAvaliacoes as number,
                            reviews: v.quantidadeAvaliacoes as number,
                        });
                });
                if (markersData.length > 0)
                    setMarkers(markers.concat(markersData));
            } 
        } catch (e: Error | any) {
            setErrorMsg("Erro ao pesquisas => " + e.message);
        }
        setTimeout(() => {
            setShowBtnProcurarNaArea(false);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Localizacao Status =>", status);
            if (status !== 'granted') {
                setErrorMsg('Sem permissão para obter localização atual!');
                setShowProcurandoCoordenada(false);
                return;
            }
            else {
                
                let location = await Location.getCurrentPositionAsync({});
                setShowProcurandoCoordenada(false);
                setShowBtnProcurarNaArea(true);
                _map.current.animateToRegion({
                    
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: initialMapState.region.latitudeDelta,
                    longitudeDelta: initialMapState.region.longitudeDelta,
                }, 350);

                setRegion({ ...region, latitude: location.coords.latitude, longitude: location.coords.longitude })
                await Procurar();
            }
            //console.log("Localizacao =>", state);

        })();
    }, []);



    const theme = useTheme();


    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 2); // animate 30% away from landing on the next item
            if (index >= markers.length) {
                index = markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            



            //const regionTimeout = setTimeout(() => {
                
            //    if (mapIndex != index) {
            //        mapIndex = index;

            //        console.log("ai2 =>", { index, mapIndex });

            //        const { coordinate } = state.markers[index];


            //        _map.current.animateToRegion(
            //            {
            //                ...coordinate,
            //                latitudeDelta: state.region.latitudeDelta,
            //                longitudeDelta: state.region.longitudeDelta,
            //            },
            //            350
            //        );

            //    }
            //}, 2000);

            //clearTimeout(regionTimeout);

            

            
        });
    });

    const interpolations = markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }
        
        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);


    const onRegionChangeComplete = (e: Region) => {
        if (!loading) {
            setShowBtnProcurarNaArea(true);
            setRegion(e)
        }
    }


    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
                onRegionChangeComplete={onRegionChangeComplete}
                
            >
                {markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../assets/images/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
                    <Circle
                        //key={marker.id}
                        center={{
                            latitude: region.latitude,
                            longitude: region.longitude
                            }}
                        radius={5000}
                        strokeColor={'rgba(100,100,100,.5)'} fillColor={'rgba(100,100,100,.5)'}
                        zIndex={2}
                        strokeWidth={1}
                        miterLimit={0}
                    />
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Procurar"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {props.categorias.map((category: ICategoria, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        <Icone icone={category.icone} size={18} style={styles.chipsIcon} />
                        <Text>{category.nome}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={[styles.viewProcurarNaArea, { display: showBtnProcurarNaArea ? 'flex' : 'none' }]} >
                <TouchableOpacity style={styles.btnProcurarNaArea} onPress={async () => { await Procurar(); }}>
                    <Text style={styles.txtProcurarNaArea}>{showProcurandoCoordenada ? "OBTENDO COORDENADAS" : !loading ? "PROCURAR NA ÁREA" : "PROCURANDO"} </Text>
                    <ActivityIndicator size="small" color={Colors.BRANCO} style={{ display: loading ? 'flex' : 'none' }} />
                </TouchableOpacity>
            </View>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{ uri: marker.image }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <StarRating ratings={marker.rating} reviews={marker.reviews} />
                            <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            {/*<View style={styles.button}>*/}
                            {/*    <TouchableOpacity*/}
                            {/*        onPress={() => { }}*/}
                            {/*        style={[styles.signIn, {*/}
                            {/*            borderColor: '#FF6347',*/}
                            {/*            borderWidth: 1*/}
                            {/*        }]}*/}
                            {/*    >*/}
                            {/*        <Text style={[styles.textSign, {*/}
                            {/*            color: '#FF6347'*/}
                            {/*        }]}>Detalhes</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

export default MapaApp;

const styles = StyleSheet.create({

    viewProcurarNaArea: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 120 : 110,
        marginLeft: (width / 2) - 110,
        width: 220,
        alignItems: "center"
    },
    btnProcurarNaArea: {
        flexDirection: "row",
        backgroundColor: Colors.CINZADESCRICAO,
        padding: 8,
        borderRadius: 50,
        paddingHorizontal: 15,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    txtProcurarNaArea: {
        color: Colors.BRANCO
    },

    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 15 : 0,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 70 : 60,
        paddingHorizontal: 15
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 15,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginRight: 15,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});