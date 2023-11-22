export function validarEdicao(pagina: string, id: number) {
    const usuarioData = puxaID();

    // Verifica se puxaID() retornou um valor válido
    if (usuarioData && usuarioData.usuario_id !== null) {
        const UsuarioID = usuarioData.usuario_id;

        switch (pagina) {
            case 'DetalheEtapa':
            case 'VisualizarProjeto':
            case 'Anexos':
                return !(UsuarioID === id);

            case 'MyProjects':
                return !(usuarioData.usuario_nivel === 'LE');

            case 'MenuSuperior':
                const isLoginPage = (window.location.pathname === "/login") || (window.location.pathname === "/");
                return (isLoginPage ? false : (usuarioData.usuario_nivel === 'CL'));

            default:
                // Lógica padrão, caso a página não corresponda a nenhum dos casos
                return false;
        }
    } else {
        // Tratamento para caso puxaID() retorne null ou usuário_id seja null
        return false;
    }
}

const puxaID = () => {
    try {
        const perfilJSON: string | null = sessionStorage.getItem('perfil');

        if (perfilJSON !== null) {
            const parsedPerfil = JSON.parse(perfilJSON);

            if (parsedPerfil && typeof parsedPerfil === 'object' && 'usuario_id' in parsedPerfil) {
                return parsedPerfil;
            } else {
                // Se 'perfil' ou 'usuario_id' não existirem
                return { usuario_id: null };
            }
        } else {
            // Se 'perfil' for nulo
            return { usuario_id: null };
        }
    } catch (error) {
        console.error("Erro ao analisar o perfil JSON:", error);
        return { usuario_id: null };
    }
};
