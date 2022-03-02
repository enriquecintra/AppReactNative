import { _apiwebService } from "./ApiServices"
import { IUsuario } from "./UsuarioServices";

export module ProvedorServices {
    export async function ListarPorUsuario(usuarioId: number) {
        return await _apiwebService.get<IProvedor[]>("/api/provedor/listarPorUsuario/" + usuarioId);
    }
}

export interface IProvedor {
    id: number,
    razaoSocial: string,
    cnpj: number,
    usuario: IUsuario,
    enderecos: [],
    telefones: [],
    ativo: boolean
}