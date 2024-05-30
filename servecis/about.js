import nedb from 'nedb-promises'

const database = nedb({filename: 'about.db', autoload: true})

const about = [
    {

     "id":1,
      "title":"About Us",
      "about":"AirBeans' fleet of drones is equipped with advanced navigation systems, ensuring precise and reliable deliveries. These drones are designed to handle varying weather conditions, making them a dependable option for coffee lovers, rain or shine. The drones operate on an efficient and environmentally friendly electric power system, reducing the carbon footprint associated with conventional delivery methods."
 
   }

]