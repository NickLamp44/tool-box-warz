const mockMerch = [
  {
    id: "sku11",
    title: "TBW Logo Tshirt",
    category: "Shirt",
    color: "white",
    image: "Img/merch/tshirts/Goat_White_front.png",
    price: "$19.99",
  },
  {
    id: "sku21",
    title: "TBW Logo Hoodie",
    category: "Sweatshirt",
    color: "Green",
    image: "/Img/merch/sweatshirt/BOTTLE GREEN_back.jpg",
    price: "$29.99",
  },
  {
    id: "sku31",
    title: "TBW Logo Hat",
    category: "Headwear",
    image: "/Img/merch/headwear/Oyster_Hat_front.jpg",
    color: "White",
    price: "$15.99",
  },
  {
    id: "sku41",
    title: "TBW Merica Logo Sticker",
    category: "Accessories",
    image: "/Img/logos/MERICA.jpg",
    color: "White",
    price: "$1.99",
  },
  {
    id: "sku42",
    title: "TBW Dont Spill the Joe Logo Sticker",
    category: "Accessories",
    image: "/Img/logos/SpiltCoffee.jpg",
    color: "White",
    price: "$1.99",
  },
  {
    id: "sku43",
    title: "TBW Loic Bruni Logo Sticker",
    category: "Accessories",
    image: "/Img/logos/GoldenFrenchFry.jpg",
    color: "White",
    price: "$1.99",
  },
  {
    id: "sku44",
    title: "TBW Czech Logo Sticker",
    category: "Accessories",
    image: "/Img/logos/CzechCase.jpg",
    color: "White",
    price: "$1.99",
  },
];

const sizesByCategory = {
  Shirt: ["S", "M", "L", "XL"],
  Sweatshirt: ["M", "L", "XL"],
  Headwear: ["One Size"],
  Accessories: [],
};

const colors = ["Black", "White", "Gray", "Navy", "Red", "Green", "Purple"];
export { mockMerch, sizesByCategory, colors };
