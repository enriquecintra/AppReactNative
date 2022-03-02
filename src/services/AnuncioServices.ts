import { _apiwebService } from "./ApiServices"

export module AnuncioServices {

    export async function Listar() {
        return await _apiwebService.get<IAnuncio[]>("/api/Anuncio");
    }

    export async function ObterPorId(id: number) {
        return await _apiwebService.get<IAnuncio>("/api/Anuncio/" + id);
    }
}

export interface IAnuncio {
    foto: string,
    descricao: string,
    anuncioFotos:IAnuncioFotos[],
    id: number
}
export interface IAnuncioFotos{
    foto: IFoto, 
    ordem : number
}
export interface IFoto{
    descricao: string,
    base64: string
}