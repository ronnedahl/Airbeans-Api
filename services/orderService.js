import Datastore from 'nedb-promises';

const database = Datastore.create({ path: 'order.db', autoload: true });

export async function findOrdersByUserId(userId) {
    return await database.find({ userId }, { coffeeId: 0 });
}

export default { findOrdersByUserId };
