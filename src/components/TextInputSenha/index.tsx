import React, { useState } from "react";
import { TextInput, View,TouchableOpacity } from "react-native";
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../styles";

export default function TextInputSenha(props: any){
    const [textInputValue, setTextInputValue] = React.useState('');
    const [hidePass, setHidePass] = useState(true);
    return(
        <View style={styles.inputAreaCampoSenha}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholdeSenha}
                value={textInputValue}
                onChangeText={text => setTextInputValue(text)}
                secureTextEntry={hidePass}
            />
            <TouchableOpacity style={styles.iconEye} onPress={() => setHidePass(!hidePass)}>
                <Ionicons name="eye" color={Colors.PURPLE} size={25} />
            </TouchableOpacity>
        </View>
    );

}

