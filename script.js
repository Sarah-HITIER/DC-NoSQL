// Connexion au serveur
// mongosh "mongodb+srv://digitalcampus.my4j9fl.mongodb.net" --apiVersion 1 --username digital_campus

const { ObjectId } = require("mongodb");

// Switcher de base de données
// use mtl_nosql

// Créer une collection nommée “products”
db.createCollection("products");

/* Ajouter trois produits contenant les champs suivants (données factices):
 * - un intitulé (string) / entitled
 * - un prix (double) / price
 * - une quantité (int) / quantity
 * - un tableau contenant des couleurs / variations (Exemple : [“vert”, “rouge”])
 * - un objet contenant la largeur et la longueur du produit / dimensions (Exemple : { “width”: 150,50, “length”: 140.50 })
 * - un boolean pour savoir si le produit est toujours vendu sur le site. / is_still_sell
 * - un nombre représentant le nombre de fois où le produit a été vendu (int64 ou int32). / sold_number
 */
db.products.insertMany([
    {
        entitled: "T-shirt",
        price: 15.99,
        quantity: 10,
        variations: ["vert", "rouge", "jaune"],
        dimensions: { width: 150.5, length: 140.5 },
        is_still_sell: true,
        sold_number: 5
    },
    {
        entitled: "Pantalon",
        price: 25.99,
        quantity: 5,
        variations: ["bleu", "rouge"],
        dimensions: { width: 150.5, length: 140.5 },
        is_still_sell: true,
        sold_number: 10
    },
    {
        entitled: "Chaussure",
        price: 35.99,
        quantity: 15,
        variations: ["vert", "gris"],
        dimensions: { width: 150.5, length: 140.5 },
        is_still_sell: true,
        sold_number: 20
    }
]);

// Afficher la liste intégrale des produits
db.products.find({});

// Afficher un seul produit (à partir de son id, de son intitulé ou autre…)
db.products.find({ _id: ObjectId("646f57783ba986566bd4a5b1") });
db.products.find({ entitled: "T-shirt" });

// Afficher seulement les produits qui ont un prix supérieur ou égal 30
db.products.find({ price: { $gte: 30 } });

// Afficher seulement les produits qui ont un prix compris entre 20 et 40 et qui possèdent une largeur supérieure à 35.
db.products.find({ price: { $gt: 20, $lt: 40 }, "dimensions.width": { $gt: 35 } });

// Afficher seulement les produits ayant trois couleurs (vous pouvez essayer de récupérer les produits ayant au moins trois couleurs dans le tableau variations, mais nous aborderons plus tard).
db.products.find({ variations: { $size: 3 } });

// Afficher seulement les produits qui n’ont pas la couleur verte.
db.products.find({ variations: { $ne: "vert" } });

// Afficher seulement les produits qui ont au moins une couleur bleue ou rouge.
db.products.find({ variations: { $in: ["bleu", "rouge"] } });

// Afficher seulement les produits qui ont au moins une couleur bleue et rouge.
db.products.find({ variations: { $all: ["bleu", "rouge"] } });

// Afficher seulement les produits qui sont encore vendus avec un nombre de vente supérieur ou égal à 15.
db.products.find({ is_still_sell: true, sold_number: { $gte: 15 } });

// Afficher seulement les produits où le prix est inférieur à la largeur du produit.
db.products.find({ price: { $lt: "$dimensions.width" } });

// Afficher seulement les produits contenant un champ “variations” de type tableau
db.products.find({ variations: { $type: "array" } });

// Afficher seulement les produits contenant un champ “dimensions” (vérifier s’il existe).
db.products.find({ dimensions: { $exists: true } });

// Modifier le deuxième produit que vous avez ajouté avec les informations que vous voulez. (exemple : modifier le prix, ajouter une couleur…)
db.products.updateOne({ _id: ObjectId("646f57783ba986566bd4a5b2") }, { $set: { price: 20.99 } });

// Supprimer l’un de vos produits
db.products.insertOne({
    entitled: "T-shirt",
    price: 15.99,
    quantity: 10,
    variations: ["vert", "rouge", "jaune"],
    dimensions: { width: 150.5, length: 140.5 },
    is_still_sell: true,
    sold_number: 5
});
db.products.deleteOne({ _id: ObjectId("646f5c8b3ba986566bd4a5b4") });

// Ajouter deux nouvelles parties rapidement, à l’aide de la méthode bulkWrite : modifier la première partie ajoutée et supprimer la seconde.
