import React, { useState } from 'react';
import { View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Colors } from '../../styles';

import ButtonComponent from '../Button';
import Loading from '../Loading';
import TextInputLogin from '../TextInputLogin';
import TextInputSenha from '../TextInputSenha';
import TextLink from '../TextLink';
import { styles } from './styles';

export default function FormLogin(props: any){
    
    const [hidePass, setHidePass] = useState(true);
    return(
        <View style={styles.inputContainer} >
            <TextInputLogin
                actionChange={props.changeLogin}
            />
            <TextInputSenha
                actionChange={props.changeSenha}
                placeholdeSenha={props.placeholdeSenha}
            />
            <CheckBox
                containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                textStyle={{ backgroundColor: "transparent", fontSize: 16, color:Colors.PURPLE }}
                title="Lembrar meu login"
                checked={props.checkboxChecked}
                onPress={props.actionPressCheckBox}
            />
            <ButtonComponent
                actionPress={props.loginFunction}
                value="Acessar"
                nomeestilo="textoBotaoPurble"
            />
            <TextLink
                value="Esqueci a senha"
                action={props.pressEsqueciSenhaLink}
                style={styles.linkEsqueciMinhaSenha}
            />
            <TextLink
                value="Primeiro acesso"
                action={props.pressPrimeiroAcessoLink}
                style={styles.linkPrimeiroAcesso}
            />
            <Loading show={props.loading} />
        </View>
    );
}