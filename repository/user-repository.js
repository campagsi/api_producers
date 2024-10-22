const mysql = require('../mysql');


exports.verifyUser = async function (email) {

    const query = `
            SELECT *
               FROM usuarios
              WHERE email=?
        `;
    try{
        
        const result = await mysql.execute(query, [
            email
        ]);

        return result;    
    } catch (error) {
        console.log('errorSql', error);
    }   
};

exports.getAll = async function () {

    console.log('getAll --------->');

    const query = `
            SELECT *
               FROM usuarios
        `;

    return await mysql.execute(query)
};

exports.getOne = async function (userId) {

    const query = `
            SELECT *
               FROM usuarios
               WHERE (id = '${userId}' )
        `;

    const result = await mysql.execute(query)

    return result;
};

exports.save = async function (nome, email, senha) {
    try {

        const query = 'INSERT INTO `usuarios` (`email`, `nome`, `senha`) VALUES (?, ?, ?);';
        const result = await mysql.execute(query, [
            email,
            nome,
            senha
        ])

        return result;

    } catch (error) {
        return console.log({ error: error });
    }
}

exports.update = async function (data, userId) {
    
    
    try {

        const query = `UPDATE usuarios set email = ?, 
                                             nome = ?, 
                                             senha = ?
                                       WHERE id = ? `;
        
        const result = await mysql.execute(query, [
            data.email,
            data.nome,
            data.senha,
            userId
        ])
        
        return result;
    } catch (error) {
        return console.log({ error: error });
    }
}        

exports.delete = async function (data, userId) {
    try {
        const query = `DELETE FROM users WHERE id = ?`;
        const result = await mysql.execute(query, [req.params.productId]);
        return result;
    }catch (error) {
        return console.log({ error: error });
    }
}