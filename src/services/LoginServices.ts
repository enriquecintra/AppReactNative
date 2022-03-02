import { _apiwebService } from "./ApiServices"
import { IUsuario } from "./UsuarioServices";

export module LoginServices {
    export async function Login(login: string, senha: string) {
        return await _apiwebService.post<IUsuario>("/api/Autenticador", {login,senha}, false);
    }
}


