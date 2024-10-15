const mysql = require('../mysql').pool;
const { pool } = require('../mysql');
const produtorRepository = require('../repository/producer-repository');

function censor(censor) {
    var i = 0;
    
    return function(key, value) {
      if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
        return '[Circular]'; 
      
      if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';
      
      ++i; // so we know we aren't using the original object anymore
      
      return value;  
    }
  }

exports.getAll = async (req, res, next) => {
    
    let name = '';
    if (req.query.name) {
        name = req.query.name;    
    }

    const result = await produtorRepository.getAll(name);
    const produtors= [];

    console.log('result------------>');
    console.log(result[0]);

    return res.status(200).send(result);

    

    console.log('List END');

    const response = {
        length: result.length,
        produtors: produtors
    }
    return res.status(200).send(response);
};

exports.postProductor = async (req, res, next) => {
    try {

        console.log('Controller prokducer');

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

exports.getProductDetail = async (req, res, next)=> {
    try {
        const query = 'SELECT * FROM products WHERE productId = ?;';
        const result = await mysql.execute(query, [req.params.productId]);

        if (result.length == 0) {
            return res.status(404).send({
                message: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            product: {
                productId: result[0].productId,
                name: result[0].name,
                price: result[0].price,
                productImage: result[0].productImage,
                request: {
                    type: 'GET',
                    description: 'Retorna todos os produtos',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateProduct = async (req, res, next) => {

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
