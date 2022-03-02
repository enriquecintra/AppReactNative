import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

interface Props {
    icone: string,
    style?: StyleProp<ViewStyle>,
    size: number;
}

export const Icone: React.FC<Props> = (props) => {

    function ObterIcone() {

        var tipo = props.icone.split(".")[0];
        var nome = props.icone.split(".")[1];

        switch (tipo) {
            case "AntDesign":
                return <AntDesign style={props.style} name={nome} size={props.size} />;
            case "Entypo":
                return <Entypo style={props.style} name={nome} size={props.size} />;
            case "EvilIcons":
                return <EvilIcons style={props.style} name={nome} size={props.size} />;
            case "Feather":
                return <Feather style={props.style} name={nome} size={props.size} />;
            case "FontAwesome":
                return <FontAwesome style={props.style} name={nome} size={props.size} />;
            case "FontAwesome5":
                return <FontAwesome5 style={props.style} name={nome} size={props.size} />;
            //case "FontAwesome5Pro":
            //    return <FontAwesome5Pro style={props.style} name={nome} size={props.size} />;
            case "Fontisto":
                return <Fontisto style={props.style} name={nome} size={props.size} />;
            case "Foundation":
                return <Foundation style={props.style} name={nome} size={props.size} />;
            case "Ionicons":
                return <Ionicons style={props.style} name={nome} size={props.size} />;
            case "MaterialCommunityIcons":
                return <MaterialCommunityIcons style={props.style} name={nome} size={props.size} />;
            case "MaterialIcons":
                return <MaterialIcons style={props.style} name={nome} size={props.size} />;
            case "Octicons":
                return <Octicons style={props.style} name={nome} size={props.size} />;
            case "SimpleLineIcons":
                return <SimpleLineIcons style={props.style} name={nome} size={props.size} />;
            case "Zocial":
                return <Zocial style={props.style} name={nome} size={props.size} />;
            default:
                return <Ionicons style={props.style} name={"md-bookmark"} size={props.size} />;
        }
    }

    return ObterIcone()
};


export default Icone;
