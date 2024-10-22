const bcrypt = require('bcrypt');
const { pool } = require('../mysql');
const userRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {

    console.log('------------->');
    const resultUser = await userRepository.verifyUser(req.body.email);        

    if (resultUser)   {

        const data = JSON.parse(JSON.stringify(resultUser))

        bcrypt.compare(req.body.senha, data[0].senha, (err, result) => {
            if(err) return res.status(401).send({"message": "Falha na autenticação1!"})
            if(result) {

                let token = jwt.sign({
                    id_usuario: data[0].id,
                    email: data[0].email
                }, process.env.JWT_KEY, {
                    expiresIn: 60*5
                })

                return res.status(200).send({
                    "message": "Autenticado com sucesso!",
                    "token": token
                });
            }else{  
                
                return res.status(401).send({"message": "Falha na autenticação2!"})
            }
        } );

    }else{

        return res.status(200).send({"message": "Falha na autenticação3!"})
    }
};

exports.getAll = async (req, res, next) => {

    const result = await userRepository.getAll();

    const response = {
        length: result.length,
        users: result.map(prod => {
            return {
                email: prod.email,
                nome: prod.nome,
                senha: prod.senha,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um usuário específico',
                    url: process.env.URL_API + 'users/' + prod.cpf_cnpj
                }
            }
        })    
    }
    return res.status(200).send(response);
};

exports.getOne = async (req, res, next) => {

    let id_user = '';
    if (req.params['userId']) {
        id_user = req.params['userId'];    
    }

    const result = await userRepository.getOne(id_user);

    const response = {
        length: result.length,
        users: result.map(prod => {
            return {
                email: prod.email,
                nome: prod.nome,
                senha: prod.senha,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um usuário específico',
                    url: process.env.URL_API + 'usuarios/' + prod.cpf_cnpj
                }
            }
        })    
    }
    return res.status(200).send(response);
};

exports.post = async (req, res, next) => {

    const resultUser = await userRepository.verifyUser(req.body.email);        

    if (resultUser)   return res.status(500).send({ errorEmail: 'Usuário já cadastrado' });        

    try {

        const hashedPassword = await bcrypt.hash(req.body.senha, 10);

        const result = await userRepository.save(req.body.nome, req.body.email, hashedPassword);             

        const response = {
            message: 'Usuário inserido com sucesso',
            createdUser: {
                "id": result.insertId,
                "nome": req.body.nome,
                "email": req.body.email,
                "senha": req.body.senha,                
                request: {
                    type: 'POST',                    
                    url: process.env.URL_API + 'users/cadastro'
                }
            }
        }
        return res.status(201).send(response);
   
     } catch (error) {
        return res.status(500).send({ error: error });
     }     
};

exports.update = async (req, res, next) => {

    try {
        
        const result = await userRepository.update(req.body, req.params.userId);

        const response = {
            message: 'Usuário atualizado com sucesso',
            upatedProduct: {
                nome: req.body.name,
                email: req.body.email,
                senha: req.body.senha,
                request: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um usuário específico',
                    url: process.env.URL_API + 'users/' + req.params.userId
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.delete = async (req, res, next) => {
    try {

        console.log('userId');
        console.log(req.params);

        const result = await userRepository.delete(req.params.userId);

        const response = {
            message: 'Usuário removido com sucesso',
            request: {
                type: 'POST',
                description: 'deleta um usuário',
                url: process.env.URL_API + 'users',
            }
        }
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
