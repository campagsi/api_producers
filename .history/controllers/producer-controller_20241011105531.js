const mysql = require('../mysql').pool;
const { pool } = require('../mysql');
const produtorRepository = require('../repository/producer-repository');

exports.getAll = async (req, res, next) => {

    const result = await produtorRepository.getAll();

    const response = {
        length: result.length,
        produtors: result.map(prod => {
            return {
                cpgfCnpj: prod.cpgf_cnpj,
                nomeProdutor: prod.nome_produtor,
                nomeFazenda: prod.nome_fazenda,
                cidade: prod.cidade,
                estado: prod.estado,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: process.env.URL_API + 'produtos/' + prod.cpf_cnpj
                }
            }
        })    
    }
    return res.status(200).send(response);
};

exports.getOne = async (req, res, next) => {

    
    console.log('req------------>');
    console.log(req.params);

    let id_produtor = '';
    if (req.params.productorId) {
        id_produtor = req.params.productorId;    
    }

    const result = await produtorRepository.getOne(id_produtor);

    const response = {
        length: result.length,
        produtors: result.map(prod => {
            return {
                cpgfCnpj: prod.cpgf_cnpj,
                nomeProdutor: prod.nome_produtor,
                nomeFazenda: prod.nome_fazenda,
                cidade: prod.cidade,
                estado: prod.estado,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: process.env.URL_API + 'produtos/' + prod.cpf_cnpj
                }
            }
        })    
    }
    return res.status(200).send(response);
};

exports.postProductor = async (req, res, next) => {
    try {

        const result = await produtorRepository.saveProdutor(req.body);

        const response = {
            message: 'Produtor inserido com sucesso',
            createdProductor: {
                "productorId": result.insertId,
                "cpfCnpj": req.body.cpf_cnpj,
                "nomeProdutor": req.body.nome_produtor,
                "nomeFazenda": req.body.nome_fazenda,
                "cidade": req.body.cidade,
                "estado": req.body.estado,
                "areaTotal": req.body.area_total,
                "areaAgri": req.body.area_agri,
                "areaVege": req.body.area_vege,
                "cultura": req.body.cultura,
                request: {
                    type: 'GET',
                    description: 'Retorna todos os produtos',
                    url: process.env.URL_API + 'produtors'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateProdutor = async (req, res, next) => {

    try {
        const query = ` UPDATE products
                           SET name         = ?,
                               price        = ?
                         WHERE productId    = ?`;
        await mysql.execute(query, [
            req.body.name,
            req.body.price,
            req.params.productId
        ]);
        const response = {
            message: 'Produto atualizado com sucesso',
            upatedProduct: {
                productId: req.params.productId,
                name: req.body.name,
                price: req.body.price,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: process.env.URL_API + 'produtos/' + req.params.productId
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const query = `DELETE FROM products WHERE productId = ?`;
        await mysql.execute(query, [req.params.productId]);

        const response = {
            message: 'Produto removido com sucesso',
            request: {
                type: 'POST',
                description: 'Insere um produto',
                url: process.env.URL_API + 'produtos',
                body: {
                    name: 'String',
                    price: 'Number'
                }
            }
        }
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
