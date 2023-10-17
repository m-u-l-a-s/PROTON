export function validarMudancaStatus (status: string )
{
    //Não iniciado && CO
    //Em Andamento && CL
   return ((status === 'N') && (puxaPerfil() === 'CO')) || ((status === 'A') && (puxaPerfil() === 'CL') )
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