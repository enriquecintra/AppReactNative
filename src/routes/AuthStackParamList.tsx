export enum AuthScreens {
    Login = 'Login',
    EsqueciMinhaSenha = 'EsqueciMinhaSenha',
    PrimeiroAcesso = 'PrimeiroAcesso',
    ConfirmarCodigo = 'ConfirmarCodigo',
    AlterarSenha = 'AlterarSenha'
}

export type AuthStackParamList = {
    Login: undefined;
    EsqueciMinhaSenha: undefined;
    PrimeiroAcesso: undefined;
    ConfirmarCodigo: { token: string, irPara: AuthScreens };
    AlterarSenha: { token: string }
};