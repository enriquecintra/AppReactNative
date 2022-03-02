import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';


import Home from '../pages/home/index';
import MeusDados from '../pages/meusDados';
import { AppScreens, AppStackParamList } from './AppStackParamList';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AppRoutes from './app.routes';

import {
    CommonActions,
    DrawerActions,
    DrawerNavigationState,
    ParamListBase,
    useLinkBuilder, useNavigation } from '@react-navigation/native';



import AuthRoutes from './auth.routes';
const Drawer = createDrawerNavigator();

type Props = React.ComponentProps<typeof DrawerItemList>;

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AuthContext from '../contexts/auth';

import utf8 from 'utf8'
import { Colors } from '../styles';


function CustomDrawerContent(props: Props) {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <MeusDados />

            <DrawerContentScrollView {...props} contentContainerStyle={{  }}>
                <SafeAreaView css={{ top: 'always', horizontal: 'never' }}>
                    
                    <DrawerItemList {...props} />
                <DrawerItem label={() =>
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                style={{ paddingRight: 10 }}
                                name="settings"
                                size={30}
                            />
                            <Text style={{ alignItems: 'center' }}>Configurações</Text>
                        </View>
                    </>
                }

                    onPress={() => { alert("Configurações!"); }}
                />
                <DrawerItem label={() =>
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                style={{ paddingRight: 10 }}
                                name="help"
                                size={30}
                            />
                            <Text style={{ alignItems: 'center' }}>Ajuda</Text>
                        </View>
                    </>
                }

                    onPress={() => { alert("Ajuda!"); }}
                />
                </SafeAreaView>
            </DrawerContentScrollView>

            <SafeAreaView>
                <DrawerItem label={() =>
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons
                            style={{ paddingRight: 10 }}
                            name="logout"
                            size={30}
                            color={Colors.BRANCO}
                        />
                        <Text style={{ color: 'white', alignItems: 'center',fontWeight: 'bold' }}>SAIR</Text>
                    </View>
                </>
            }
                style={{ backgroundColor: Colors.PURPLE, borderRadius:50  }}
                onPress={signOut}
            />

            </SafeAreaView>


        </View>
    );
}

const AppMenu = () => {

    const { provedor } = useContext(AuthContext);

    const navigation = useNavigation<StackNavigationProp<AppStackParamList, AppScreens.Menu>>();

    const titleProvedor = provedor.razaoSocial ? provedor.razaoSocial : "";

    return (

        <Drawer.Navigator initialRouteName={AppScreens.Menu} drawerContent={(props) => <CustomDrawerContent {...props} />}

            screenOptions={{
                drawerPosition: 'right',
                drawerStyle: styles.drawerStyle,
                headerTitleAlign: 'center',
                headerShown: true,
                drawerLabelStyle: styles.drawerLabelStyle,
                headerLeft: ({ }) => (<Ionicons
                    style={{ paddingRight: 10, color: Colors.PURPLE }}
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={30}
                />),
                headerRight: ({ }) =>
                (<Ionicons
                    style={{ paddingRight: 10 }}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    name="md-menu"
                    size={30}
                />)
            }}
        >

            <Drawer.Screen name={AppScreens.AppRoutes} component={AppRoutes}
                options={{
                    drawerLabel: () => LabelDrawer("Home", "home"),
                    title: titleProvedor
                }}
            />

            <Drawer.Screen name={AppScreens.MinhaConexao} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Minha Conexão", "wifi"),
                    title: titleProvedor

                }}
            />
            <Drawer.Screen name={AppScreens.MeusDados} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Meus Dados", "account-box"),
                    title: titleProvedor
                }}
            />
            <Drawer.Screen name={AppScreens.Pagamentos} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Pagamentos", "payments"),
                    title: titleProvedor
                }}
            />
            <Drawer.Screen name={AppScreens.MinhaLoja} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Minha Loja", "store"),
                    title: titleProvedor
                }}
            />
            <Drawer.Screen name={AppScreens.Produtos} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Serviços e Produtos", "handyman"),
                    title: titleProvedor
                }}
            />

            <Drawer.Screen name={AppScreens.Termos} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Termos e Condições", "library-books"),
                    title: titleProvedor
                }}
            />

            <Drawer.Screen name={AppScreens.Politica} component={MeusDados}
                options={{
                    drawerLabel: () => LabelDrawer("Política e Privacidade", "privacy-tip"),
                    title: titleProvedor
                }}
            />

        </Drawer.Navigator>
    );

}

const LabelDrawer = (titulo: string, nomeIcon: string) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons
                style={{ paddingRight: 10 }}
                name={nomeIcon}
                size={30}
            />
            <Text style={{ alignItems: 'center' }}>{titulo}</Text>
        </View>
    )
};



//const AppMenuHome = () => {
//    return (
//        Menus(AppScreens.Home)
//    );
//}

//const AppMenuMinhaConexao = () => {
//    return (
//        Menus(AppScreens.MinhaConexao)
//    );
//}

//const AppMenuMeusDados = () => {
//    return (
//        Menus(AppScreens.MeusDados)
//    );
//}


//const AppMenuPagamentos = () => {
//    return (
//        Menus(AppScreens.Pagamentos)
//    );
//}

//const AppMenuMinhaLoja = () => {
//    return (
//        Menus(AppScreens.MinhaLoja)
//    );
//}

//const AppMenuProdutos = () => {
//    return (
//        Menus(AppScreens.Produtos)
//    );
//}

//const AppMenuTermos = () => {
//    return (
//        Menus(AppScreens.Termos)
//    );
//}

//const AppMenuPolitica = () => {
//    return (
//        Menus(AppScreens.Politica)
//    );
//}





//const Menus = (screen: AppScreens) => {


//    const navigation = useNavigation<StackNavigationProp<AppStackParamList, typeof screen>>();
//    return (<Drawer.Navigator initialRouteName={screen}
        
//        screenOptions={{
//            drawerStyle: styles.drawerStyle,
//            headerTitleAlign: 'center',
//            drawerLabelStyle: styles.drawerLabelStyle,
//            headerRight: ({ }) =>
//            (<Ionicons
//                style={{ paddingRight: 10 }}
//                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//                name="md-menu"
//                size={30}
//            />)
//        }}



//    >

//        <Drawer.Screen name={AppScreens.AppRoutes} component={AppRoutes}
//            options={{
//                swipeEnabled: false
//                //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//            }}
//        />
//        <Drawer.Screen name={AppScreens.MinhaConexao} component={AuthRoutes}
//            options={{
//                title: "Minha Conexão",
//                //drawerLabel: (({ focused }) => TextMenu("", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.MeusDados} component={MeusDados}
//            options={{
//                title: "Meus Dados",
//                //drawerLabel: (({ focused }) => TextMenu("Meus Dados", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.Pagamentos} component={MeusDados}
//            options={{
//                title: "Pagamentos",
//                //drawerLabel: (({ focused }) => TextMenu("Pagamentos", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.MinhaLoja} component={MeusDados}
//            options={{
//                title: "Minha Loja",
//                //drawerLabel: (({ focused }) => TextMenu("Minha Loja", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.Produtos} component={MeusDados}
//            options={{
//                title: "Serviços e Produtos",
//                //drawerLabel: (({ focused }) => TextMenu("Serviços e Produtos", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.Termos} component={MeusDados}
//            options={{
//                title: "Termos e Condições",
//                //drawerLabel: (({ focused }) => TextMenu("Termos e Condições", focused))
//            }} />
//        <Drawer.Screen name={AppScreens.Politica} component={MeusDados}
//            options={{
//                title: "Politica e Privacidade",
//                //drawerLabel: (({ focused }) => TextMenu("Politica e Privacidade", focused))
//            }} />
//    </Drawer.Navigator>)

//}


export default AppMenu;


const styles = StyleSheet.create({

    drawerStyle: {
        //backgroundColor: '#313131',
        paddingVertical: 10
        
    },
    drawerLabelStyle: { color: '#000', borderBottomColor: '#000', borderBottomWidth: 1, padding: 5 }

});




//const AppMenu = () => {
//    return (

//        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}

//            screenOptions={{
//                drawerPosition: 'right',
//                drawerStyle: styles.drawerStyle,
//                headerTitleAlign: 'center',
//                headerShown: true,
//                headerRight: ({ }) =>
//                (<Ionicons
//                    style={{ paddingRight: 10 }}
//                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//                    name="md-menu"
//                    size={30}
//                />)
//            }}
//        >

//            <Drawer.Screen name={AppScreens.Home} component={AppMenuHome}
//                options={{
//                    title: "Home",
//                    drawerLabelStyle: styles.drawerLabelStyle,
//                    swipeEnabled: false
//                }}
//            />

//            <Drawer.Screen name={AppScreens.MinhaConexao} component={AppMenuMinhaConexao}
//                options={{
//                    title: "Minha Conexão",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />
//            <Drawer.Screen name={AppScreens.MeusDados} component={AppMenuMeusDados}
//                options={{
//                    title: "Meus Dados",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />
//            <Drawer.Screen name={AppScreens.Pagamentos} component={AppMenuPagamentos}
//                options={{
//                    title: "Pagamentos",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />
//            <Drawer.Screen name={AppScreens.MinhaLoja} component={AppMenuMinhaLoja}
//                options={{
//                    title: "Minha Loja",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />
//            <Drawer.Screen name={AppScreens.Produtos} component={AppMenuProdutos}
//                options={{
//                    title: "Serviços e Produtos",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />

//            <Drawer.Screen name={AppScreens.Termos} component={AppMenuTermos}
//                options={{
//                    title: "Termos e Condições",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />

//            <Drawer.Screen name={AppScreens.Politica} component={AppMenuPolitica}
//                options={{
//                    title: "Política e Privacidade",
//                    drawerLabelStyle: styles.drawerLabelStyle
//                    //drawerLabel: (({ focused }) => <Text style={focused ? styles.drawerLabelStyleFocused : styles.drawerLabelStyle}>Home</Text>)
//                }}
//            />

//        </Drawer.Navigator>
//    );

//}

