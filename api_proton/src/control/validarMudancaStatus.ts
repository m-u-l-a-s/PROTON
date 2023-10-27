export function validarMudancaStatus (status: string, processo_responsavel:number, etapa_responsavel:number )
{
    //Não iniciado && CO
    //Em Andamento && CL
    let UsuarioID = puxaID()
   return ((status === 'P') && (UsuarioID === etapa_responsavel)) || ((['A','C'].includes(status)) && (UsuarioID === processo_responsavel) )
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