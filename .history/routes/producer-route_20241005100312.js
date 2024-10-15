const express = require("express");
const router = express.Router();
const ProductorsController = require('../controllers/producer-controller');

router.get('/', ProductorsController.getAll);
router.post('/', ProductorsController.postProductor);
//router.get('/:productorId', ProductorsController.getProductDetail);
//router.patch('/:productorId', login.required, ProductsController.updateProduct);
//router.delete('/:productorId', login.required, ProductsController.deleteProduct);

/*
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem : "Listando Produtores!"
    });
});


router.get('/:id_produtor', (req, res, next) => {

    const ID = req.params.id_produtor
    if (ID == 'especial'){
    
        res.status(200).send({
            mensagem : "Você descobriu o ID especial!"
        });
    }else{
        res.status(200).send({
            mensagem : "Pegando um produtor escífico!"
        });
    }    
});

router.post('/', (req, res, next) => {

    ProductorsController.postProductor();
    
    //res.status(200).send({mensagem : "Salvando um Produtor!"});
});

router.patch('/:id_produtor',  (req, res, next) => {
    res.status(200).send({
        mensagem : "Alterando um Produtor!"
    });
});

router.delete('/:id_produtor',  (req, res, next) => {
    res.status(200).send({
        mensagem : "Deletando um Produtor!"
    });
});
*/

module.exports = router;