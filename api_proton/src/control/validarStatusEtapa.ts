export function validarStatus(status:string) {
    switch (status) {
        case 'N':
            return 'Não iniciado';
        case 'A':
            return 'Em andamento';
        case 'C':
            return 'Concluído';
        default:
            return 'Bn';
}}

// Código antigo 
    // if (status === 'N'){
    //     return 'Não iniciado'
    // }
    // else if (status=== 'A') {
    //     return 'Em andamento'
    // }
    // else{
    //     return 'Concluído'
    // }