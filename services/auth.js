import nedb from 'nedb-promises'

const database = new nedb({filename: 'register.db', autoload: true})

// Add new user
 async function createUser(user){

   const newUser = await database.insert(user)
   return newUser
 }

 const findUser = async (username) =>{
    console.log(username)
  const user = await database.findOne({username : username})
    console.log(user)
    return user
 }

export { createUser, findUser }