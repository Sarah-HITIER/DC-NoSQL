db.users.find({
    email: { $eq: "nolanbigot.ev@gmail.com" }
});

db.users.find({
    field: { operator: value }
});

/*

Cette exemple est utilisée pour tous les opérateurs de comparaison

*/

db.users.find({
    email: { $in: ["nolanbigot.ev@gmail.com", "test@test.fr"] }
});

db.users.find({
    $and: [{ price: { $gt: 150 } }, { entitled: { $eq: "clavier" } }]
});

// Le or fonctionne pareil que l'exemple ci-dessus
// Le nor fonctionne de la même manière aussi

db.product.find({
    price: { $not: { $lt: 15 } }
});

db.users.find({
    email: { $exists: true }
});

db.users.find({
    email: { $type: ["string"] }
});

db.products.find({
    $expr: { $gt: ["$width", "$height"] }
});
// Ici on récupère les documents dont la largeur est supérieur à la hateur.

db.products.find({
    entitled: { $regex: "<regex>" }
});

// Ici on vérifie que l'intitulé est égal à la regex.

db.products.find({
    $where: function () {
        return this.price > 10;
    }
});
// Ici on sélectionne les produits qui ont un prix supérieur à 10 via une fonction javascript

db.productds.find({
    variations: { $all: ["S", "M", "L", "XL"] }
});
// On récupère les produits qui ont un champ variation contenant les valeurs du tableau proposé dans $all.

db.products.find({
    variations: { $size: 2 }
});
// On récupère les produits qui ont un tableau variations contenant deux éléments stricts
