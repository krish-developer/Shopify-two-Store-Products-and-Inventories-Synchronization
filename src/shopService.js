const { getItemSku } = require("./api/InventoryApi");
const { getAll } = require("./api/ProductsApi");
const { findMatchingSku } = require("./utils/findMatchingSku");
const { setInventoryLevel } = require("./api//InventoryLevelApi");

const syncAllProductsBetweenShops = async (shop1, shop2) => {
  const productsShop1 = await getAll(shop1);
  const productsShop2 = await getAll(shop2);

  for (let product of productsShop1) {
    const productSku = await getItemSku(product, shop1);
    const matchingProductInShop2 = await findMatchingSku(productsShop2, productSku);

    if (matchingProductInShop2) {
      const item = {
        id: matchingProductInShop2.inventory_item_id,
        available: product.available
      };
      await setInventoryLevel(shop2, item.id, item);
    }
  }
};

module.exports = { syncAllProductsBetweenShops };
