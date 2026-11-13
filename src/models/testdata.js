import User from "./user.model.js";
import Event from "./event.model.js";
import Category from "./category.model.js";
import Registration from "./registration.model.js";

// ---------- User 1:N Event (creador del evento) ----------
User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

// ---------- Category 1:N Event ----------
Category.hasMany(Event, { foreignKey: 'categoryId', as: 'events' });
Event.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// ---------- User 1:N Registration ----------
User.hasMany(Registration, { foreignKey: 'userId', as: 'registrations' });
Registration.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ---------- Event 1:N Registration ----------
Event.hasMany(Registration, { foreignKey: 'eventId', as: 'registrations' });
Registration.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });



export { 
  User, 
  Event, 
  Category, 
  Registration 
};