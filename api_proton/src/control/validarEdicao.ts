export function validarEdicao(pagina: string, id: number) {
    let UsuarioID = puxaID().usuario_id
    switch (pagina) {
        case 'DetalheEtapa':
            return !(UsuarioID === id)

        case 'VisualizarProjeto':
            return !(UsuarioID === id)

        case 'Anexos':
            return !(UsuarioID === id)

        case 'MyProjects':
            return !(puxaID().usuario_nivel === 'LE')

        case 'MenuSuperior':
            const isLoginPage = (window.location.pathname === "/login") || (window.location.pathname === "/");
            return (isLoginPage ? false : (puxaID().usuario_nivel === 'CL'))

        default:
    }


}

const puxaID = () => {
    try {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        return JSON.parse(JSON.parse(perfilJSON))
    } catch (error) {
        return 'ER'
    }
}