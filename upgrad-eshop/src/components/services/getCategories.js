let categories = ['ALL', 'APPAREL', 'ELECTRONICS', 'FOOTWEAR', 'PERSONAL CARE'];

const getCategories = () => new Promise(resolve => resolve(categories));

export default getCategories;
