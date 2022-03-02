import { _apiwebService } from "./ApiServices"
import { ILoja } from "./LojaServices";

export module UsuarioServices {

    export async function PrimeiroAcesso(email: string, cpf: string, senha: string) {
        return await _apiwebService.put<IToken>("/api/usuario/primeiroacesso", email, { email, cpf, senha }, false);
    }

    export async function ReenviarCodigo(token: string) {
        return await _apiwebService.post<IToken>("/api/usuario/reenviarcodigo", { token }, false);
    }

    export async function Confirmar(token: string, codigo: number) {
        return await _apiwebService.post<IToken>("/api/usuario/confirmar", { token, codigo }, false);
    }

    export async function EsqueciMinhaSenha(login: string) {
        return await _apiwebService.get<IToken>("/api/usuario/esqueciminhasenha/" + login);
    }

    export async function AlterarSenha(senha: string, token: string) {
        return await _apiwebService.post<IToken>("/api/usuario/alterarsenha", { senha, token });
    }

    export async function SalvarNavegacao(lojaId: number) {
        return await _apiwebService.post<INavegacao>("/api/Navegacao/", { lojaId });
    }

    async function ListarNavegacao(tipo: number, pagina: number, quantidade: number) {
        return await _apiwebService.get<INavegacao[]>("/api/Navegacao/listar/" + tipo + "/" + pagina + "/" + quantidade);
    }

    export async function Recentes(pagina: number, quantidade: number) {
        return await ListarNavegacao(1, pagina, quantidade);
    }
    export async function MaisVistos(pagina: number, quantidade: number) {
        return await ListarNavegacao(2, pagina, quantidade);
    }
    export async function MelhorAvaliado(pagina: number, quantidade: number) {
        return await ListarNavegacao(3, pagina, quantidade);
    }
    export async function MelhorPreco(pagina: number, quantidade: number) {
        return await ListarNavegacao(4, pagina, quantidade);
    }



}

export interface IToken {
    token: string
}


export interface IMensagem {
    mensagem: string
}


export interface IUsuario {
    id: number,
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
    ultimoAcesso: Date;
    documentos: [];
    enderecos: [];
    telefones: [];
    dataAceiteTermos: Date;
    dataAceitePolitica: Date;
    role: string,
    token: string
}



export interface INavegacao {
    lojaId: number,
    loja: ILoja,
    quantidadeAcesso: number
}
