var Sequelize = require('sequelize');
var sequelize = new Sequelize('sitoweb', 'root', '',  {dialect: 'mysql'});

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Pizza = sequelize.define('pizza', {
  name: Sequelize.STRING,
  price: Sequelize.FLOAT,
});

var Ingredient = sequelize.define('ingredient', {
  name: Sequelize.STRING,
});

var Order = sequelize.define('order', {
  datetimeOrder: Sequelize.DATE,
  datetimeDelivery: Sequelize.DATE,
  place: Sequelize.STRING,
});

var Beer = sequelize.define('beer', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  alcholContent: Sequelize.STRING,
  price: Sequelize.STRING,
});

User.hasMany(Order);
Order.belongsTo(User);

Ingredient.belongsToMany(Pizza, {through: 'Contains', as: 'ingredients'});
Pizza.Ingredients = Pizza.belongsToMany(Ingredient, {through: 'Contains'})

Pizza.belongsToMany(Order, {through: 'OrderPizza', as: 'pizzas'});

Beer.belongsToMany(Order, {through: 'OrderBeer', as: 'beers'});


async function i(){
  // Creo gli ingredienti
  await Ingredient.create({name: "Pomodoro"}).then(console.log);
  await Ingredient.create({name: "Mozzarella"}).then(console.log);
  await Ingredient.create({name: "Salsiccia"}).then(console.log);
  await Ingredient.create({name: "Patatine fritte"}).then(console.log);
  await Ingredient.create({name: "Funghi"}).then(console.log);
  await Ingredient.create({name: "Wurstel"}).then(console.log);

  //prendo le loro istanze (potevo farlo in fase di creazione ma nel programma reale sarà in differita)
  let Mozzarella = await Ingredient.findOne({where: {name: "Mozzarella"}});
  let Salsiccia = await Ingredient.findOne({where: {name: "Salsiccia"}});
  let PatatineFritte = await Ingredient.findOne({where: {name: "Patatine fritte"}});
  let Pomodoro = await Ingredient.findOne({where: {name: "Pomodoro"}});
  let Funghi = await Ingredient.findOne({where: {name: "Funghi"}});
  let Wurstel = await Ingredient.findOne({where: {name: "Wurstel"}});

  
  //Creo le pizze
  pizza = await Pizza.create({name: "Margherita", price: 4.5});
  pizza.setIngredients([Pomodoro, Mozzarella]);
  console.log(pizza);

  pizza = await Pizza.create({name: "Funghi e salsiccia", price: 6.0});
  pizza.setIngredients([Pomodoro, Mozzarella, Funghi, Salsiccia]);
  console.log(pizza);

  pizza = await Pizza.create({name: "Wurstel", price: 6.0});
  pizza.setIngredients([Pomodoro, Mozzarella, Wurstel]);
  console.log(pizza);
}



/*Ingredient.create({name: "Mozzarella"}).then(console.log);*/

sequelize.sync();

module.exports = {
  'User': User,
  'Pizza': Pizza,
  'Beer': Beer,
  'Ingredient': Ingredient,
  'Order': Order
};
