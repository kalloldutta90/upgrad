let products = [
  {
    id: 1,
    name: 'EMERGO RUNNER',
    price: 1679,
    // image: require('Shoe.png').default,
    image: 'Shoe.png',
    description:'From rigorous running to high \
    intensity training this shoe has got you covered. Is waterproof and dustproof.',
    quantity: 10,
    category: ['APPAREL','FOOTWEAR'],
  },
  {
    id: 2,
    name: 'Levi Strauss Jeans',
    price: 1000,
    // image: require('Levi.png').default,
    image: 'Levi.png',
    description: 'Levis 512™ Taper Jeans strike the \
    perfect balance between skinny and tapered. Made with 100% cotton.',
    quantity: 10,
    category: ['APPAREL'],
  },
  {
    id: 3,
    name: 'Iphone 12',
    price: 100000,
    // image: require('Iphone.png').default,
    image: 'Iphone.png',
    description: '15.40 cm (6.1-inch) Super Retina XDR display \
    Advanced camera system for better photos in any light.',
    quantity: 10,
    category: ['ELECTRONICS'],
  },
];

const getProducts = () => new Promise(resolve => resolve(products));

export default getProducts;
