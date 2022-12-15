var express = require('express');
var router = express.Router();
const ProduitModel = require("../modules/Produit")

/**
 * Liste des produits
 */
router.get('/', async function (req, res, next) {
    try {
        const produits = await ProduitModel.find({})
        res.render('ProductList', { produits })
    } catch (err) {
        console.log(err)
    }
});

/**
 * l'interface d'ajout d'un produit
 */
router.get('/moreProduct', function (req, res, next) {
    res.render('NewProduct')
});

router.post('/addProduct', async function (req, res, next) {
    try {
            const { Libelle, Prix, Description, Quantite } = req.body;
            const checkProductExist = await ProduitModel.findOne({
                Libelle: Libelle,
            });
            if(checkProductExist){
            res.redirect('/product');
            throw new Error("existeee")
            }
             const newProduct = new ProduitModel({ Libelle, Prix, Description, Quantite });
            newProduct.save();
            res.redirect('/product');   
            
                
    } catch (err) {
        console.log(err)
    }
});

/**
 * Supprimer un produit
 */
router.get('/SuppProduct/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        await ProduitModel.findByIdAndDelete(id);
        res.redirect('/product');
    } catch (err) {
        console.log(err)
    }

});
/**
 * Modifier un produit
 */
router.get('/UpdateProduct/:id', async function (req, res, next) {

    try {
        const { id } = req.params;
        InfoProduit = await ProduitModel.findById(id);
        res.render('editerProduit', { InfoProduit })
    } catch (err) {
        console.log(err)
    }

});

/**
 * ajouter un produit
 */
router.post('/ProductUpdated/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        console.log({id});
        const { Libelle, Prix, Description, Quantite } = req.body;
        
        await ProduitModel.findByIdAndUpdate(id,{ Libelle, Prix, Description, Quantite });
        res.redirect('/product');
    } catch (err) {
        console.log(err)
    }

});

module.exports = router;