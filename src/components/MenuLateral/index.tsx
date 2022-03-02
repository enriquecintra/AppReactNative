import React, { useContext, useState } from 'react';
import 'react-native-gesture-handler';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../../pages/login';
import EsqueciMinhaSenha from '../../pages/login/esqueciMinhaSenha/EsqueciMinhaSenha';
import Home from '../../pages/home';

const Drawer = createDrawerNavigator();

export default function Menu(){
    return(
            <Drawer.Navigator initialRouteName="App"
             screenOptions={{
                drawerStyle: {
                  backgroundColor: '#313131',
                  paddingVertical:20,
                  
                },
                drawerPosition: "left",

              }}> 
                <Drawer.Screen 
                    name="App" 
                   component={Home}
                    options = {{
                        drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff'}}>Primeira Tela</Text>)
                    }}/>
                <Drawer.Screen
                    name="MeuApp" 
                    component={EsqueciMinhaSenha}
                    options = {{
                        drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff'}}>Segunda Tela</Text>)
                    }}/>
            </Drawer.Navigator>
    )
}