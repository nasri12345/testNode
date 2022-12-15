const mongoose = require("mongoose");
const produitSchema = new mongoose.Schema(
  {
   Libelle: { type: String, required: true  },
    Description: { type: String, required: true },
    Quantite: { type: Number, required: true },
    Prix: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Produits", produitSchema);
