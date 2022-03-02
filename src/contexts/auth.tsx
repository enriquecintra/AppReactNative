import React, { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

import { LoginServices } from "../services/LoginServices";
import { IUsuario } from "../services/UsuarioServices";
import { IProvedor } from "../services/ProvedorServices";
import { ILoja } from "../services/LojaServices";

export const AuthProvider: React.FC = ({ children }) => {
    const [provedor, setProvedor] = useState<IProvedor>({} as IProvedor);
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<IUsuario>({} as IUsuario);
    const [recentes, setRecentes] = useState<ILoja[]>([] as ILoja[]);

    async function signIn(login: string, senha: string) {
        try {
            if (login.length == 0 || senha.length == 0) throw new Error("Informe usuário e senha!");
            const response = await LoginServices.Login(login, senha);
            //console.log("singin =>", response);
            if (response.ok && response.data) {
                if (response.data.token == null) throw new Error("Usuario ou senha inválidos!");
                setUser(response.data);
                setToken(response.data.token);
                await AsyncStorage.setItem('Token', response.data.token);
                //console.log(response.data);
            } else {
                throw response.error;
            }

        } catch (e: Error | any) {
            throw e;
        }
    }
    async function signOut(){
        setToken("");
        await AsyncStorage.setItem('Token', "");
        setUser({} as IUsuario);
        setProvedor({} as IProvedor);
    }

    const ajustaRecentes = (loja: ILoja) => {
        let novaLista = [loja];
        let listaAux = recentes.filter(l => l.id != loja.id);
        novaLista = novaLista.concat(listaAux);
        setRecentes(novaLista);
    }

    return (
        <AuthContext.Provider value={{ signed: token != "", token, user, signIn, signOut, provedor, setProvedor, recentes, setRecentes, ajustaRecentes }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


interface AuthContextData {
    provedor: IProvedor;
    signed: boolean;
    token: string;
    user: IUsuario;
    signIn(login: string, senha: string): Promise<void>;
    signOut(): void;
    setProvedor(provedor: IProvedor): void;
    recentes: ILoja[],
    setRecentes(lojas: ILoja[]): void;
    ajustaRecentes(provedor: ILoja): void;

}