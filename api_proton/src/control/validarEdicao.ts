export function validarEdicao (pagina: string, id:number)
{
    let UsuarioID = puxaID()
    switch(pagina) {
        case 'DetalheEtapa':
            return !(UsuarioID === id)

       case 'VisualizarProjeto':
            return !(UsuarioID === id)
        default:
      }
}

const puxaID = () =>
{
    try {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        return JSON.parse(JSON.parse(perfilJSON)).usuario_id
    } catch (error) {
        return 'ER'
    }
}