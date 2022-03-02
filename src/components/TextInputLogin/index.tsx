import React from "react";
import { TextInput } from "react-native";
import { styles } from './styles';

export default function TextInputLogin(props: any){
    return(
        <TextInput 
            style={styles.input} 
            placeholder="CPF ou E-mail" 
            onChangeText={props.actionChange} 
        />
    );

}

