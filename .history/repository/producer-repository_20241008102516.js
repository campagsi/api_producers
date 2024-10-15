const mysql = require('../mysql');

exports.getAll = async function (producerId) {

    const query = `
            SELECT *
               FROM produtores
        `;

    console.log('producerId --------->');
    console.log(producerId);

    if (producerId != ''){
        query = query+" WHERE (id = ${producerId} );";
    }

    console.log('query --------->');
    console.log(query);

    const result = await mysql.execute(query)

    return result;
};

exports.getOne = async function (producerId) {

    const query = `
            SELECT *
               FROM produtores
               WHERE (id = ${producerId} )
        `;

    console.log('producerId --------->');
    console.log(producerId);

    const result = await mysql.execute(query)

    return result;
};

exports.saveProdutor = async function (data) {
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

        return result;

    } catch (error) {
        return console.log({ error: error });
    }
}