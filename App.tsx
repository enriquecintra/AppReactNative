import { AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/index';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from './src/contexts/auth';

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    );
}

//AppRegistry.registerComponent("main", () => App);