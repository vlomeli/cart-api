const fetchProducts = async () => {
    const res = await fetch('https://cart-api.alexrodriguez.workers.dev/products');
    if (!res. ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
};


export default fetchProducts;