import { ICategoria } from "../services/CategoriaServices";

export enum AppScreens {
    Menu = 'Menu',
    AppRoutes = 'AppRoutes',
    Home = 'Home',
    Provedor = 'Provedor',
    MinhaConexao = 'MinhaConexao',
    MeusDados = 'MeusDados',
    Pagamentos = 'Pagamentos',
    MinhasCompras = 'MinhasCompras',
    MinhaLoja = 'MinhaLoja',
    Produtos = 'Produtos',
    Termos = 'Termos',
    Politica = 'Politica',
    Chat = 'Chat',
    Loja = 'Loja',
    Lojas = 'Lojas',
    SobreSerFornecedor = 'SobreSerFornecedor',
    Busca = 'Busca',
    BuscaMapa = 'BuscaMapa'
}
export type AppStackParamList = {
    Menu: undefined;
    AppRoutes: undefined;
    Home: undefined;
    Provedor: undefined;
    MinhaConexao: undefined;
    MeusDados: undefined;
    Pagamentos: undefined;
    MinhasCompras: undefined;
    MinhaLoja: undefined;
    Produtos: undefined;
    Termos: undefined;
    Politica: undefined;
    Chat: undefined;
    SobreSerFornecedor: undefined;
    Loja: { id: number; };
    Lojas: { categoria: ICategoria; };
    Busca: undefined;
    BuscaMapa: undefined;
};