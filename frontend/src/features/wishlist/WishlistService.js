const API_URL = '/api/user';

export const getWishlist = async () => {
    const res = await fetch(`${API_URL}/wishlist`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
};

export const removeWishlistItem = async (productId) => {
    const res = await fetch(`${API_URL}/remove-wishlist`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error('Failed to remove item');
    return res.json();
};
