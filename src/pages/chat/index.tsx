import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Header from "../../components/Header"
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppStackParamList } from '../../routes/AppStackParamList';
import { IProvedor, ProvedorServices } from '../../services/ProvedorServices';
import AuthContext from '../../contexts/auth';

import { GiftedChat, IMessage } from 'react-native-gifted-chat'



interface Props {
    navigation: StackNavigationProp<AppStackParamList, AppScreens.Chat>,
    route: RouteProp<AppStackParamList, AppScreens.Chat>,
}

const Chat: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([
        /**
         * Mock message data
         */
        // example of system message
        {
            _id: 0,
            text: 'New room created.',
            createdAt: new Date().getTime(),
            system: true
        },
        // example of chat message
        {
            _id: 1,
            text: 'Henlo!',
            createdAt: new Date().getTime(),
            user: {
                _id: 2,
                name: 'Test User'
            }
        }
    ] as IMessage[]);

    function handleSend(newMessage: IMessage[]) {
        setMessages(GiftedChat.append(messages, newMessage));
    }
    //useEffect(() => {
    //    const fetchData = async () => {
    //        const response = await ProvedorServices.ListarPorUsuario(user.id);
    //        console.log("Provedores =>", { response, user });
    //        if (response.data)
    //            setLista(response.data);
    //    };
    //    fetchData();

    //}, [] as IProvedor[]);


//    const [lista, setLista] = useState([] as IProvedor[]);

    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            user={{ _id: 1 }}
        />
    );
}

export default Chat;
