import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
    
    const TOKEN = '84d336ccf629a56913da1c4ededb1a';
    const client = new SiteClient(TOKEN);
        // validar os dados antes de sair cadastrando, nao como aqui: (...request.body)
    const registroCriado = await client.items.create({
        itemType: '977057',
        ...request.body,
    })
    console.log(registroCriado);

    response.json({
        dados: 'Dado aleatório',
        registroCriado: registroCriado,
    })
    return;
}
    response.status(404).jason({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })
}