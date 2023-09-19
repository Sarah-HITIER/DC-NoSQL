db.createCollection("products");

db.products.insertMany([{}, {}, {}]);

db.products.find({});

db.products.find({ _id: ObjectId("646eec831d82271612994601") });

db.products.find({ price: { $gte: 50 } });

db.products.find({
    price: { $gt: 20, $lt: 40 },
    "dimensions.width": { $gt: 35 }
});

db.products.find({
    variations: { $size: 3 }
});

db.products.find({
    variations: { $nin: ["vert"] }
});

db.products.find({
    variations: { $in: ["rouge", "bleu"] }
});

db.products.find({
    variations: { $all: ["rouge", "blue"] }
});

db.products.find({
    is_still_sell: { $eq: true },
    sold_number: { $gte: 15 }
});

db.products.find({
    $expr: { $lt: ["$price", "$dimension.width"] }
});

db.products.find({
    variations: { $type: ["array", "object"] }
});

db.products.find({
    dimensions: { $exists: true }
});

db.products.updateOne(
    { _id: ObjectId("646f3045395313f5f560c837") }, // Filtre
    { $set: { entitled: "barette de RAM", price: 451 } } // Les modifications approtées.
);

/*
$set est l'opérateur qui permet la modification
$unset permet de supprimer un champs

*/
/*

Le updateMany fonctionne de la même manière

*/

db.products.deleteOne(
    { _id: ObjectId("646f3045395313f5f560c837") } // filtre
);

db.products.deleteMany({ _id: ObjectId("646f3045395313f5f560c837") });

db.products.bulkWrite([{ insertOne: {} }, { updateOne: {} }]);

// bulkWrite permet de réaliser plusieurs requêtes en même temps. Comme une insertion et une modification.

/**
 * Schema Type
 *
 * Type de données qui existent dans MongoDB
 *
 * string : chaine de caractères
 * array : tableau
 * object : objet
 * Boolean (bool) : boolean true/false
 * int32 : -2.147.483.648 / 2.147.483.648
 * int64 (long) : -9.223.372.036.854.775.808 / 9.223.372.036.854.775.808
 * double : nombre décimaux
 * decimal128 : nombre décimaux (plus de chiffre après la virgule)
 * date
 * timestamp
 * ObjectId : les identifiants uniques
 * NULL
 *
 */

/*
Ajout un schema type sur une collection qui n'existe pas 

db.createCollection('<nom de notre collection>', {})

Le deuxième paramètre est un objet qui contient les configurations de notre collection.


*/

// https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/

db.createCollection("users", {
    validator: {
        // validator permet d'ajouter un schema type
        $jsonSchema: {
            bsonType: "object", // on précise que le schéma est au format Objet
            required: ["email", "password"], // required est un tableau qui précise les champs obligatoires des documents
            properties: {
                // permet de définir les différents champs utilisables dans les documents
                email: {
                    bsonType: "string" // le champ email doit être de type string sinon le document est refusé.
                },
                password: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "long",
                    minimum: 0,
                    maximum: 100
                }
            }
        }
    }
});

// L'opérateur jsonSchema permet de déclarer un schéma type

db.runCommand({
    collMod: "users", // ça permet de spécifier une collection à modifier.
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password", "price"],
            properties: {
                email: {
                    bsonType: "string"
                },
                password: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "long",
                    minimum: 0,
                    maximum: 0
                }
            }
        }
    },
    validationLevel: "moderate" // permet de spécifier la façon dont va réagir la base de données, dans le cas où un document n'est pas valide. moderate permet d'accepter tous les documents même les invalides. Ils seront pas contre consignés dans un fichier de log.
});
