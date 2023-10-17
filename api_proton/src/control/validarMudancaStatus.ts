export function validarMudancaStatus (status: string )
{
    //Não iniciado && CO
    //Em Andamento && CL
    let perfil = puxaPerfil()
    console.log('PErFILFILFIFL: ' + perfil)
    console.log('statusTUSTUS: ' + status)
   return ((status === 'N') && (perfil === 'CO')) || ((['A','C'].includes(status)) && (perfil === 'CL') )
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