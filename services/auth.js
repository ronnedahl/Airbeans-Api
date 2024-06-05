import nedb from 'nedb-promises'

const database = new nedb({filename: 'register.db', autoload: true})

// Add new user
 async function createUser(user){

   const newUser = await database.insert(user)
   return newUser
 }

 const findUser = async (username) =>{
    const user = await database.findOne({username : username})
    return user
 }

 const findUserById = async (userId) =>{
  const user = await database.findOne({_id : userId})
  return user
}

export { createUser, findUser, findUserById }