import { boolean } from "@storybook/addon-knobs";
import { _apiwebService } from "./ApiServices"
import { IUsuario } from "./UsuarioServices";

export module LojaServices {

    export async function Listar(pagina: number, quantidade: number) {
        return await _apiwebService.get<ILoja[]>("/api/Loja/" + pagina.toString() + "/" + quantidade.toString());
    }

    export async function ObterPorId(id: number) {
        return await _apiwebService.get<ILoja>("/api/Loja/" + id);
    }

    export async function ListarPorCategoria(categoriaId: number, pagina: number, quantidade: number) {
        return await _apiwebService.get<ILoja[]>("/api/Loja/categoria/" + categoriaId + "/" + pagina.toString() + "/" + quantidade.toString());
    }

    export async function ListarPorLocalizacao(latitude: number, longitude: number, raio: number) {
        return await _apiwebService.get<ILoja[]>("/api/Loja/localizacao/" + latitude.toString() + "/" + longitude.toString() + "/" + raio.toString());
    }
    
}


export interface IProduto {
    nome: string,
    resumo: string,
    descricao: string,
    valor: number,
    desconto: number,
    destaque: boolean,
    produtoFotos: IProdutoFoto[],
    lojaId: number,
    segmento: string,
    segmentoId: number,
    categoria: string,
    categoriaId: number,
    id: number,
}

export interface IProdutoFoto {
    produtoid: number,
    fotoid:number,
    foto: IFoto,
    Ordem: number,
    posicao: string
}

export interface IFoto {
    descricao: string,
    base64: string
}

export interface ITelefone {
    tipoTelefone: number,
    ddi: string,
    ddd: string,
    numero: string,
    ramal: string,
    id: number,
}

export interface IEndereco {
    tipoEndereco: number,
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    padrao: true,
    id: number,
    complemento: string,
    latitude: number,
    longitude: number,
}

export interface ILojaFotos {
    //foto: string,
    ordem: number,
    posicao: string,
    id: number,
}

export interface IAvaliacao {
    nota: number;
    preco: number;
    descricao: string;
    resposta: string;
    mostrar: boolean;
    id: number,
}

export interface ILoja {
    id: number,
    cnpj: string,
    nome: string,
    resumo: string,
    descricao: string,
    tipoFornecedor: number,
    logo: string,
    produtos: IProduto[],
    telefones: ITelefone[],
    avaliacoes: IAvaliacao[],
    atendimentos: [],
    lojaFotos: ILojaFotos[],
    ativa: boolean,
    //usuarioId: number,
    endereco: IEndereco,
    lojaPlanoPrecos: [],
    usuario: IUsuario,
    latitude?: number;
    longitude?: number;
    quantidadeAvaliacoes?: number;
    mediaAvaliacoes?: number;

}