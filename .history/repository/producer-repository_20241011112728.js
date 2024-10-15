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
               WHERE (id = ${producerId} )
        `;

    console.log('producerId- getOne --------->');
    console.log(producerId);

    const result = await mysql.execute(query)

    return result;
};

exports.saveProducer = async function (data) {
    try {

        

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
        console.log('data --------->');
        console.log(data);

        return true;
        return result;

    } catch (error) {
        return console.log({ error: error });
    }
}

exports.saveProducer = async function (data) {
    try {

        

        const query = `UPDATE `produtores` set `cpf_cnpj` = ?, 
        nome_produtor = ?, 
        nome_fazenda = ?, 
        cidade = ?, 
        estado = ?,  
        area_total = ?, 
        area_agri = ?, 
        area_vege = ?, 
        cultura 
        WHERE productId    = ? `;
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
        console.log('data --------->');
        console.log(data);
    }
}        