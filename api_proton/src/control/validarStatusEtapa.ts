export function validarStatus(status:string) {
    if (status === 'N'){
        return 'Não iniciado'
    }
    else if (status=== 'A') {
        return 'Em andamento'
    }
    else{
        return 'Concluído'
    }
}