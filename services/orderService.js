import nedb from 'nedb-promises';

// Initialize the NeDB datastore
const db = nedb.create({ filename: 'orders.db', autoload: true });

// Create a new order
export const createOrder = async (orderData) => {
    const newOrder = {
        ...orderData,
        createdAt: new Date()
    };
    return await db.insert(newOrder);
};

// Find orders by user ID
export const findOrdersByUserId = async (userId) => {
    return await db.find({ userId });
};

export default { createOrder, findOrdersByUserId };
