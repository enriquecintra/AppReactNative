import { _apiwebService } from "./ApiServices"

export module CategoriaServices {
    export async function ListarPorTipo(tipo: number, pagina: number, quantidade: number) {
        return await _apiwebService.get<ICategoria[]>("/api/categoria/listar/" + tipo + "/" + pagina.toString() + "/" + quantidade.toString());
    }
}


export interface ICategoria {
    id: number,
    nome: string,
    descricao: string,
    foto: string,
    tipo: number,
    segmentos: ISegmento[],
    icone: string
}


export interface ISegmento {
    nome: string,
    descricao: string
}