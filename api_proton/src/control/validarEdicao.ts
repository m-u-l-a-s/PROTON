export function validarEdicao (pagina: string)
{
    let perfil = puxaPerfil()
    switch(pagina) {
        case 'DetalheEtapa':
            return !(perfil === 'CL')
        default:
      }
}

const puxaPerfil = () =>
{
    try {
        const perfilJSON: any = sessionStorage.getItem('perfil')
        return JSON.parse(JSON.parse(perfilJSON)).usuario_nivel
    } catch (error) {
        return 'ER'
    }
}