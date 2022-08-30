var express = require('express');
var router = express.Router();
var fs = require('fs');
const { param } = require('.');

/* API Endpoint: Get Catalog Size */
router.get('/size', function(req, res, next) {
    fs.readFile('./products.json',(err, catalogRaw)=>{
        if(err){
            res.status(501).send({"success":false})
        }
        var catalogData = JSON.parse(catalogRaw);
        var validProducts = catalogData.filter((product)=>{
            return product.quantity > 0
        })
        res.status(200).send({
            "success":true,
            "count": validProducts.length,
        })
    })
});

/* API Endpoint: Get catalog by id */
router.get('/:id', function(req, res, next){
    var queryID = req.params.id;
    fs.readFile('./products.json',(err, catalogRaw)=>{
        if(err){
            res.status(501).send({"success":false})
        }
        var catalogData = JSON.parse(catalogRaw);
        var validProducts = catalogData.filter((product)=>{
            return product.id == queryID
        })
        if(validProducts.length > 0){
            res.status(200).send({
                "products": validProducts,
                "success":true,
            })
        }
        else{
            res.status(404).send({
                "success":false,
            })
        }
        
    })
})

module.exports = router;