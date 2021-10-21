import { createStore } from "redux";

export const categories = [];
const defaultState = [
  {
    id: 1,
    name: "Смартфон Apple iPhone 12",
    price: 73499,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/d3fc026e612788081fad02e19abacfbc/c835cc60027fb5c55ce95e766ae349d06a6c4de26b0adf019dd4c6df16daa736.jpg",
    category: "Смартфоны",
    count: 1,
    description:
      "6x2.99 ГГц, 4 Гб, 1 SIM, OLED, 2532х1170, камера 12+12 Мп, NFC, 5G, GPS, 2815 мА*ч ",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 2,
    name: "Смартфон Apple iPhone 11",
    price: 56999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/e9f94bf2facab8c36abb00eb27bdb184/e46531f9972a05f1300d180268380f672dedbee2bddd2a610b661b71850dd4ca.jpg",
    category: "Смартфоны",
    count: 1,
    description:
      "6x2.65 ГГц, 4 Гб, 1 SIM, IPS, 1792x828, камера 12+12 Мп, NFC, 4G, GPS, 3110 мА*ч",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 3,
    name: "Смартфон Apple iPhone X",
    price: 54999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/533ae536548a8afe63f3d9a5d542c2bc/347f49107a5e3f87c5a1d978e0359d6fcd259a679cd176520587f1d506293c36.jpg",
    category: "Смартфоны",
    count: 1,
    description:
      "6x2.5 ГГц, 3 Гб, 1 SIM, OLED, 2436x1125, камера 12+12 Мп, NFC, 4G, GPS, 2700 мА*ч",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 4,
    name: "Планшет Apple iPad Air",
    price: 55999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/679422287933ac42bccd9efebb613796/32477abc6b5b2055fe7b0a999d46aeed5be0c875cfb2fff841fa74087ffb3480.jpg",
    category: "Планшеты",
    count: 1,
    description: "2360x1640, IPS, 6х3.1 ГГц, BT, iPadOS",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 5,
    name: "Планшет Apple iPad Pro",
    price: 77999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/1d1051383969daf66fdb9c64d2eca32e/0c91a41706f9d7c13e7649e0cd583feb674086b211d2c0c57e2548aa76faf7aa.jpg",
    category: "Планшеты",
    count: 1,
    description: "2388x1668, IPS, 8, 8 ГБ, BT, iPadOS",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 6,
    name: "Ноутбук Apple MacBook Air",
    price: 116699,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/80dd495244fb99ee3bf72b387f4b723d/41fbb0012918eb89be15f209addbb49912ee554576f157be471a9728f040d32c.jpg",
    category: "Ноутбуки",
    count: 1,
    description:
      "2560x1600, IPS, Apple M1, 8, RAM 16 ГБ, SSD 256 ГБ, M1 7-core , Wi-Fi, macOS",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 7,
    name: "Ноутбук Apple MacBook Pro",
    price: 169999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/500/500/e234c2e66d9e73b8c505389c1b7e1f79/808f3e523affa4841e76f15da463159c8486f7726c024fcc53a991a27f6f77e2.jpg",
    category: "Ноутбуки",
    count: 1,
    description:
      "2560x1600, IPS, Apple M1, 8, RAM 16 ГБ, SSD 256 ГБ, M1 8-core , Wi-Fi, macOS",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 8,
    name: "27'' Моноблок Apple iMac 27 Retina 5K",
    price: 281999,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/8fadfeb5c0db2965832ed9c2e7bef89c/99b6b31932be3c27a248b1ee89671926df3754ca6f71b88eef53bc134b31c0bb.jpg",
    category: "Компьютеры",
    count: 1,
    description:
      "Intel Core i7, 8x3800 МГц, IPS, 5120x2880, 16 ГБ DDR4, SSD 1000 ГБ, AMD Radeon Pro 5500 XT, Mac OS X",
    activeBasket: false,
    activeFavorite: false
  },
  {
    id: 9,
    name: "Смарт-часы Apple Watch Series SE GPS 44mm",
    price: 27499,
    img: "https://c.dns-shop.ru/thumb/st4/fit/0/0/044ea67e3e7c9e9568dfee1d52ee5ce9/4177cf33fba5c9c5ea1e2676674d0c37984b1c711b07bf0bbae559fc4583c93d.jpg",
    category: "Смарт-часы",
    count: 1,
    description:
      "корпус - серый, ремешок - черный, iOS 14 и выше, крепление - на руку, Bluetooth, Wi-Fi, WR50",
    activeBasket: false,
    activeFavorite: false
  }
];

// Push categories
const allCategories = [];
defaultState.forEach((i) => allCategories.push(i.category));

const uniqueArr = allCategories.filter(
  (item, i, arr) => arr.indexOf(item) === i
);
uniqueArr.forEach((i) => categories.push(i));

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return [...action.payload];
    case "HANDLE_FAVORITE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store };
