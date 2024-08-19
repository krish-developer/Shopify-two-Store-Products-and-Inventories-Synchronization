require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const { shops } = require("./src/config");
const { syncAllProductsBetweenShops } = require("./src/shopService");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.get("/sync-shops", async (req, res) => {
  const shop1 = shops.find(shop => shop.name == "Shop1Name");
  const shop2 = shops.find(shop => shop.name == "Shop2Name");

  if (shop1 && shop2) {
    await syncAllProductsBetweenShops(shop1, shop2);
    res.send("All products synced successfully.");
  } else {
    res.status(404).send("One or both shops not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
