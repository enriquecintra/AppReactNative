import React, { useEffect, useState } from 'react';

import { 
    View,
    TextInput,
    ScrollView,
    Modal,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreens, AuthStackParamList } from '../../../routes/AuthStackParamList';
import { CheckBox } from 'react-native-elements';
import { UsuarioServices } from "../../../services/UsuarioServices";
import { styles } from './styles';
import Header from '../../../components/Header';
import {styleGlobal} from '../../../styles/styles'
import TextInputSenha from '../../../components/TextInputSenha';
import ButtonComponent from '../../../components/Button';
import ModalComponente from '../../../components/ModalComponente';


type primeiroAcessoScreenProp = StackNavigationProp<AuthStackParamList, AuthScreens.PrimeiroAcesso>;

export default function PrimeiroAcesso() {

    const [isSelectedTermos, setSelectionTermos] = useState(false);
    const [isSelectedPolitica, setSelectionPolitica] = useState(false);
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [modalTermos, setModalTermos] = useState(false);
    const [modalPolitica, setModalPolitica] = useState(false);


    function handleEmailChange(email: string) { setEmail(email); }
    function handleCPFChange(cpf: string) { setCPF(cpf); }
    function handleSenhaChange(senha: string) { setSenha(senha); }
    function handleSenhaConfirmacaoChange(senhaConfirmacao: string) { setSenhaConfirmacao(senhaConfirmacao); }

    async function handlePrimeiroAcessoPress() {
        try {
            if (email.length == 0 || cpf.length ==0 || senha.length == 0 || senhaConfirmacao.length == 0) throw new Error("Preencha todos os campos!");
            if (senha != senhaConfirmacao) throw new Error("As senhas não são iguais!");
            if (!isSelectedPolitica && !isSelectedTermos) throw new Error("É preciso aceitar os termos e as politicas para continuar!"); 

            const response = await UsuarioServices.PrimeiroAcesso(email, cpf, senha);
            
            //console.log(response);
            if (response.ok && response.data)
                navigation.navigate(AuthScreens.ConfirmarCodigo, { token: response.data.token, irPara: AuthScreens.Login });
            else
                alert(response.error.message);
        } 
        catch (e: Error | any) {
            alert(e.message);
        }
    }

    const mostraModalTermos = ()=>{
        setModalTermos(!isSelectedTermos);
        setSelectionTermos(!isSelectedTermos);
    }
    const escondeModalTermos = ()=>{
        setModalTermos(false);
    }

    const mostraModalPolitica = ()=>{
        setModalPolitica(!isSelectedPolitica);
        setSelectionPolitica(!isSelectedPolitica);
    }
    const escondeModalPolitica = ()=>{
        setModalPolitica(false);
    }


    const navigation = useNavigation<primeiroAcessoScreenProp>();

    return (
        <>
            <Header pagina={AuthScreens.Login} />
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.inputContainer} >
                    <TextInput style={styleGlobal.inputText} onChangeText={handleEmailChange} placeholder="E-mail" />
                    <TextInput style={styleGlobal.inputText} onChangeText={handleCPFChange} placeholder="CPF" />
                    <TextInputSenha
                        actionChange={handleSenhaChange}
                        placeholdeSenha={"Senha"}
                    />
                    <TextInputSenha
                        actionChange={handleSenhaChange}
                        placeholdeSenha={"Repita a senha"}
                    />
                    <CheckBox
                        containerStyle={{ backgroundColor: "transparent" }}
                        textStyle={{ backgroundColor: "transparent" }}
                        title='Aceito os termos e condições'
                        checked={isSelectedTermos}
                        onPress={mostraModalTermos}
                    />
                    <CheckBox
                        containerStyle={{ backgroundColor: "transparent" }}
                        textStyle={{ backgroundColor: "transparent" }}
                        title='Aceito a política de privacidade'
                        checked={isSelectedPolitica}
                        onPress={mostraModalPolitica}
                    />
                    <ButtonComponent
                        actionPress={() => handlePrimeiroAcessoPress()}
                        value="Enviar"
                        nomeestilo="textoBotaoPurble"
                    />
                    <ButtonComponent
                        actionPress={() => navigation.navigate(AuthScreens.Login)}
                        value="Voltar"
                        nomeestilo="textoBotaoPurble"
                    />
                    <ModalComponente
                        texto="Termos e Condições de Uso do Aplicativo&#013;
                        Estes Termos e Condições de Uso de Aplicativos de Desenvolvedores ('Aplicativos de Desenvolvedores') constituem um contrato celebrado entre o OPPI TECH, com sede na Cidade de São Paulo, Estado de São Paulo, na Avenida XPTO, n. 1.496, Vila , CEP 06.020-902, inscrita no CNPJ/MF sob o n. 99.999.99/9999-99 (“oppi”) e os fornencedores que optem por contratar Aplicativos de Desenvolvedores listados no Portal do Parceiro ('Estabelecimento(s)' ou “Você').&#013;
                        Os Aplicativos serão disponibilizados pelos Desenvolvedores, através do Portal do Parceiro, aos Estabelecimentos que tiverem interesse na contratação dos Aplicativos."
                        visivel={modalTermos}
                        onConfirme={escondeModalTermos}
                    ></ModalComponente>
                    <ModalComponente
                        texto="Politica"
                        visivel={modalPolitica}
                        onConfirme={escondeModalPolitica}
                    ></ModalComponente>

                </View>
            </ScrollView>
        </>
    );
}
