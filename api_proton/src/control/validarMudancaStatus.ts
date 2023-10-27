export function validarMudancaStatus (status: string )
{
    //Não iniciado && CO
    //Em Andamento && CL
    let perfil = puxaPerfil()
   return ((status === 'P') && (perfil === 'CB')) || ((['A','C'].includes(status)) && (perfil === 'LE') )
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