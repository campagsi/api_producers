const mysql = require('../mysql');

exports.getAll = async function () {

    const query = `
            SELECT *
               FROM produtores
        `;

    return await mysql.execute(query)
};

exports.getOne = async function (producerId) {

    const query = `
            SELECT *
               FROM produtores
               WHERE (id = '${producerId}' )
        `;

    const result = await mysql.execute(query)

    return result;
};

exports.saveProducer = async function (data) {
    try {

        console.log('data --------->');
        console.log(data); 


        const query = 'INSERT INTO `produtores` (`cpf_cnpj`, `nome_produtor`, `nome_fazenda`, `cidade`, `estado`, `area_total`, `area_agri`, `area_vege`, `cultura`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const result = await mysql.execute(query, [
            data.cpf_cnpj,
            data.nome_produtor,
            data.nome_fazenda,
            data.cidade,
            data.estado,
            data.area_total,
            data.area_agri,
            data.area_vege,
            data.cultura
        ])

        return result;

    } catch (error) {
        return console.log({ error: error });
    }
}

exports.updateProducer = async function (data, producerId) {
    
    console.log('chegoupassou'); 
    try {

        console.log('data --------->');
        console.log(data);

        console.log('producerId --------->');
        console.log(producerId);

        const query = `UPDATE produtores set cpf_cnpj = ?, 
                                             nome_produtor = ?, 
                                             nome_fazenda = ?, 
                                             cidade = ?, 
                                             estado = ?,  
                                             area_total = ?, 
                                             area_agri = ?, 
                                             area_vege = ?, 
                                             cultura 
                                       WHERE productId = ? `;
        
                                       console.log('query --------->');
        console.log(query);
/* 
        const result = await mysql.execute(query, [
            data.cpf_cnpj,
            data.nome_produtor,
            data.nome_fazenda,
            data.cidade,
            data.estado,
            data.area_total,
            data.area_agri,
            data.area_vege,
            data.cultura,
            producerId
        ])
        
        return result; */
    } catch (error) {
        return console.log({ error: error });
    }
}        

exports.deleteProducer = async function (data, producerId) {
    try {
        const query = `DELETE FROM products WHERE productId = ?`;
        const result = await mysql.execute(query, [req.params.productId]);
        return result;
    }catch (error) {
        return console.log({ error: error });
    }
}