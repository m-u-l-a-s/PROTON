export function validarStatus(status:string) {
    switch (status) {
        case 'P':
            return 'Pendente';
        case 'A':
            return 'Em aprovação';
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