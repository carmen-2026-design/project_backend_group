import User from "./user.model.js";
// import Event from "./event.model.js";
// import Category from "./category.model.js";
// import Registration from "./registration.model.js";

// /**
//  * JoinUp · Seed data for joinup_db
//  *
//  * Arrays ready to insert in this order (foreign keys depend on it):
//  *   provinces → categories → users → events → registrations
//  *
//  * Notes:
//  * - The *_id fields are included so the relations are easy to read.
//  *   On a freshly created database, insert the rows in array order WITHOUT
//  *   the id (the columns are GEUser.hasMany(Event, {foreignKey: 'userId', as: 'events'});
// Event.belongsTo(User, {foreignKey: 'userId',as: 'owner'});

// Category.hasMany(Event, {foreignKey: 'categoryId', as: 'category'});
// Event.belongsTo(Category, {foreignKey: 'categoryId',as: 'owner'});

// User.hasMany(Registration, {foreignKey: 'userId', as: 'events'});
// Registration.belongsTo(User, {foreignKey: 'userId',as: 'owner'});

// Event.hasMany(Registration, {foreignKey: 'eventId', as: 'events'});
// Registration.belongsTo(NERATED ALWAYS AS IDENTITY) and the generated
//  *   ids will match these ones.
//  * - user_password is in plain text ONLY for seeding: hash it with bcrypt
//  *   before inserting. The password for every user is "Password123!".
//  * - schema.sql already inserts provinces and categories. If you seed them
//  *   from here, remove those INSERTs from schema.sql (or skip these arrays).
//  */

// /** @type {{province_id: number, province_name: string}[]} */
// const provinces = [
//   { province_id: 1, province_name: 'A Coruña' },
//   { province_id: 2, province_name: 'Álava' },
//   { province_id: 3, province_name: 'Albacete' },
//   { province_id: 4, province_name: 'Alicante' },
//   { province_id: 5, province_name: 'Almería' },
//   { province_id: 6, province_name: 'Asturias' },
//   { province_id: 7, province_name: 'Ávila' },
//   { province_id: 8, province_name: 'Badajoz' },
//   { province_id: 9, province_name: 'Barcelona' },
//   { province_id: 10, province_name: 'Bizkaia' },
//   { province_id: 11, province_name: 'Burgos' },
//   { province_id: 12, province_name: 'Cáceres' },
//   { province_id: 13, province_name: 'Cádiz' },
//   { province_id: 14, province_name: 'Cantabria' },
//   { province_id: 15, province_name: 'Castellón' },
//   { province_id: 16, province_name: 'Ceuta' },
//   { province_id: 17, province_name: 'Ciudad Real' },
//   { province_id: 18, province_name: 'Córdoba' },
//   { province_id: 19, province_name: 'Cuenca' },
//   { province_id: 20, province_name: 'Gipuzkoa' },
//   { province_id: 21, province_name: 'Girona' },
//   { province_id: 22, province_name: 'Granada' },
//   { province_id: 23, province_name: 'Guadalajara' },
//   { province_id: 24, province_name: 'Huelva' },
//   { province_id: 25, province_name: 'Huesca' },
//   { province_id: 26, province_name: 'Illes Balears' },
//   { province_id: 27, province_name: 'Jaén' },
//   { province_id: 28, province_name: 'La Rioja' },
//   { province_id: 29, province_name: 'Las Palmas' },
//   { province_id: 30, province_name: 'León' },
//   { province_id: 31, province_name: 'Lleida' },
//   { province_id: 32, province_name: 'Lugo' },
//   { province_id: 33, province_name: 'Madrid' },
//   { province_id: 34, province_name: 'Málaga' },
//   { province_id: 35, province_name: 'Melilla' },
//   { province_id: 36, province_name: 'Murcia' },
//   { province_id: 37, province_name: 'Navarra' },
//   { province_id: 38, province_name: 'Ourense' },
//   { province_id: 39, province_name: 'Palencia' },
//   { province_id: 40, province_name: 'Pontevedra' },
//   { province_id: 41, province_name: 'Salamanca' },
//   { province_id: 42, province_name: 'Santa Cruz de Tenerife' },
//   { province_id: 43, province_name: 'Segovia' },
//   { province_id: 44, province_name: 'Sevilla' },
//   { province_id: 45, province_name: 'Soria' },
//   { province_id: 46, province_name: 'Tarragona' },
//   { province_id: 47, province_name: 'Teruel' },
//   { province_id: 48, province_name: 'Toledo' },
//   { province_id: 49, province_name: 'Valencia' },
//   { province_id: 50, province_name: 'Valladolid' },
//   { province_id: 51, province_name: 'Zamora' },
//   { province_id: 52, province_name: 'Zaragoza' },
// ];

// /** @type {{category_id: number, category_name: string, category_description: string}[]} */
// const categories = [
//   { category_id: 1, category_name: 'Sports', category_description: 'Running, football, hiking and other sports meetups' },
//   { category_id: 2, category_name: 'Music', category_description: 'Concerts, jam sessions and music events' },
//   { category_id: 3, category_name: 'Technology', category_description: 'Talks, workshops and tech meetups' },
//   { category_id: 4, category_name: 'Culture', category_description: 'Museums, theatre, book clubs and exhibitions' },
//   { category_id: 5, category_name: 'Food', category_description: 'Tastings, cooking classes and dinners' },
// ];

// /** @type {{user_id: number, user_name: string, user_email: string, user_password: string, user_role: 'admin'|'user'}[]} */
// const users = [
//   { user_id: 1, user_name: 'Admin JoinUp', user_email: 'admin@joinup.com', user_password: 'Password123!', user_role: 'admin' },
//   { user_id: 2, user_name: 'Laura Martínez', user_email: 'laura.martinez@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 3, user_name: 'Carlos Gómez', user_email: 'carlos.gomez@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 4, user_name: 'Lucía Fernández', user_email: 'lucia.fernandez@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 5, user_name: 'Javier Ruiz', user_email: 'javier.ruiz@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 6, user_name: 'Marta Sánchez', user_email: 'marta.sanchez@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 7, user_name: 'Pablo Navarro', user_email: 'pablo.navarro@example.com', user_password: 'Password123!', user_role: 'user' },
//   { user_id: 8, user_name: 'Elena Torres', user_email: 'elena.torres@example.com', user_password: 'Password123!', user_role: 'user' },
// ];

// /**
//  * event_creation_date is omitted on purpose: the database fills it with the
//  * current date and time (DEFAULT CURRENT_TIMESTAMP).
//  * Events 9 and 10 are in the past, useful to test "upcoming events" filters.
//  *
//  * @type {{event_id: number, event_title: string, event_description: string, event_date: string,
//  *         event_address: string, event_postal_code: string, province_id: number,
//  *         event_creator_id: number, category_id: number}[]}
//  */
// const events = [
//   {
//     event_id: 1,
//     event_title: 'Sunday 10K run in Retiro Park',
//     event_description: 'Relaxed-pace group run around Retiro. All levels welcome.',
//     event_date: '2026-11-22T09:00:00',
//     event_address: 'Puerta de Alcalá, Plaza de la Independencia',
//     event_postal_code: '28001',
//     province_id: 33, // Madrid
//     event_creator_id: 2,
//     category_id: 1, // Sports
//   },
//   {
//     event_id: 2,
//     event_title: 'Acoustic jam session',
//     event_description: 'Bring your guitar, cajón or just your voice. Open mic from 20:00.',
//     event_date: '2026-11-27T20:00:00',
//     event_address: 'Carrer de Blai 25',
//     event_postal_code: '08004',
//     province_id: 9, // Barcelona
//     event_creator_id: 3,
//     category_id: 2, // Music
//   },
//   {
//     event_id: 3,
//     event_title: 'Intro to Node.js and Express workshop',
//     event_description: 'Hands-on workshop: build your first REST API. Bring your laptop.',
//     event_date: '2026-12-03T18:30:00',
//     event_address: 'Calle de la Paz 10',
//     event_postal_code: '46003',
//     province_id: 49, // Valencia
//     event_creator_id: 4,
//     category_id: 3, // Technology
//   },
//   {
//     event_id: 4,
//     event_title: 'Book club: monthly meeting',
//     event_description: 'This month we discuss a classic Spanish novel. Coffee included.',
//     event_date: '2026-12-05T17:00:00',
//     event_address: 'Calle Sierpes 48',
//     event_postal_code: '41004',
//     province_id: 44, // Sevilla
//     event_creator_id: 5,
//     category_id: 4, // Culture
//   },
//   {
//     event_id: 5,
//     event_title: 'Tapas tasting route',
//     event_description: 'Walking route through five tapas bars in the old town.',
//     event_date: '2026-12-12T13:00:00',
//     event_address: 'Calle Marqués de Larios 1',
//     event_postal_code: '29005',
//     province_id: 34, // Málaga
//     event_creator_id: 2,
//     category_id: 5, // Food
//   },
//   {
//     event_id: 6,
//     event_title: 'Hiking trail to Monte Artxanda',
//     event_description: 'Medium difficulty hike with views over the city. About 3 hours.',
//     event_date: '2026-12-13T10:00:00',
//     event_address: 'Funicular de Artxanda, Plaza del Funicular',
//     event_postal_code: '48007',
//     province_id: 10, // Bizkaia
//     event_creator_id: 6,
//     category_id: 1, // Sports
//   },
//   {
//     event_id: 7,
//     event_title: 'Indie bands night',
//     event_description: 'Three local indie bands live. Doors open at 21:00.',
//     event_address: 'Calle del Coso 120',
//     event_date: '2026-12-18T21:30:00',
//     event_postal_code: '50001',
//     province_id: 52, // Zaragoza
//     event_creator_id: 7,
//     category_id: 2, // Music
//   },
//   {
//     event_id: 8,
//     event_title: 'Christmas cooking class',
//     event_description: 'Learn three traditional Christmas recipes with a local chef.',
//     event_date: '2026-12-20T11:00:00',
//     event_address: 'Calle Real 75',
//     event_postal_code: '15003',
//     province_id: 1, // A Coruña
//     event_creator_id: 1,
//     category_id: 5, // Food
//   },
//   {
//     event_id: 9,
//     event_title: 'Guided visit to the Alhambra',
//     event_description: 'Guided tour of the Nasrid Palaces and gardens.',
//     event_date: '2026-10-17T10:00:00',
//     event_address: 'Calle Real de la Alhambra s/n',
//     event_postal_code: '18009',
//     province_id: 22, // Granada
//     event_creator_id: 8,
//     category_id: 4, // Culture
//   },
//   {
//     event_id: 10,
//     event_title: 'Frontend developers meetup',
//     event_description: 'Lightning talks about CSS, accessibility and web performance.',
//     event_date: '2026-10-29T19:00:00',
//     event_address: 'Calle Uría 20',
//     event_postal_code: '33003',
//     province_id: 6, // Asturias
//     event_creator_id: 3,
//     category_id: 3, // Technology
//   },
// ];

// /**
//  * registration_cancel_date is only set when registration_status is 'cancelled'.
//  * A user never registers twice for the same event (unique user_id + event_id)
//  * and never registers for an event they created.
//  *
//  * @type {{registration_id: number, user_id: number, event_id: number, registration_date: string,
//  *         registration_people: number, registration_status: 'not_registered'|'registered'|'cancelled',
//  *         registration_cancel_date: string|null}[]}
//  */
// const registrations = [
//   { registration_id: 1, user_id: 3, event_id: 1, registration_date: '2026-11-02T10:15:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 2, user_id: 4, event_id: 1, registration_date: '2026-11-03T18:40:00', registration_people: 2, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 3, user_id: 6, event_id: 1, registration_date: '2026-11-04T09:05:00', registration_people: 1, registration_status: 'cancelled', registration_cancel_date: '2026-11-08T12:00:00' },
//   { registration_id: 4, user_id: 2, event_id: 2, registration_date: '2026-11-05T21:30:00', registration_people: 3, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 5, user_id: 7, event_id: 2, registration_date: '2026-11-06T16:20:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 6, user_id: 5, event_id: 3, registration_date: '2026-11-04T11:00:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 7, user_id: 8, event_id: 3, registration_date: '2026-11-07T13:45:00', registration_people: 1, registration_status: 'not_registered', registration_cancel_date: null },
//   { registration_id: 8, user_id: 2, event_id: 3, registration_date: '2026-11-08T08:30:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 9, user_id: 4, event_id: 4, registration_date: '2026-11-06T19:10:00', registration_people: 2, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 10, user_id: 3, event_id: 5, registration_date: '2026-11-07T20:00:00', registration_people: 4, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 11, user_id: 6, event_id: 5, registration_date: '2026-11-08T14:25:00', registration_people: 2, registration_status: 'cancelled', registration_cancel_date: '2026-11-09T10:00:00' },
//   { registration_id: 12, user_id: 2, event_id: 6, registration_date: '2026-11-08T17:50:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 13, user_id: 5, event_id: 7, registration_date: '2026-11-09T22:10:00', registration_people: 5, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 14, user_id: 8, event_id: 8, registration_date: '2026-11-09T09:00:00', registration_people: 2, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 15, user_id: 7, event_id: 8, registration_date: '2026-11-10T08:15:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 16, user_id: 2, event_id: 9, registration_date: '2026-10-01T12:00:00', registration_people: 2, registration_status: 'registered', registration_cancel_date: null },
//   { registration_id: 17, user_id: 4, event_id: 9, registration_date: '2026-10-03T15:30:00', registration_people: 1, registration_status: 'cancelled', registration_cancel_date: '2026-10-10T09:00:00' },
//   { registration_id: 18, user_id: 6, event_id: 10, registration_date: '2026-10-15T18:00:00', registration_people: 1, registration_status: 'registered', registration_cancel_date: null },
// ];

//export{ provinces, categories, users, events, registrations };

// CONSTRAINT uq_users_email UNIQUE (user_email)
// CONSTRAINT uq_categories_name UNIQUE (category_name)
// CONSTRAINT uq_provinces_name UNIQUE (province_name)

// CONSTRAINT chk_events_postal_code CHECK (event_postal_code ~ '^[0-9]{5}$'),
//   CONSTRAINT fk_events_province  FOREIGN KEY (province_id)
//     REFERENCES provinces (province_id)  ON UPDATE CASCADE ON DELETE RESTRICT,
//   CONSTRAINT fk_events_creator FOREIGN KEY (event_creator_id)
//     REFERENCES users (user_id)          ON UPDATE CASCADE ON DELETE RESTRICT,
//   CONSTRAINT fk_events_category  FOREIGN KEY (category_id)
//     REFERENCES categories (category_id) ON UPDATE CASCADE ON DELETE RESTRICT

// CONSTRAINT chk_registrations_people CHECK (registration_people BETWEEN 1 AND 10),
//   CONSTRAINT uq_registrations_user_event UNIQUE (user_id, event_id),
//   CONSTRAINT fk_registrations_user  FOREIGN KEY (user_id)
//     REFERENCES users (user_id)   ON UPDATE CASCADE ON DELETE CASCADE,
//   CONSTRAINT fk_registrations_event FOREIGN KEY (event_id)
//     REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE


// User.hasMany(Event, {foreignKey: 'userId', as: 'events'});
// Event.belongsTo(User, {foreignKey: 'userId',as: 'owner'});

// Category.hasMany(Event, {foreignKey: 'categoryId', as: 'category'});
// Event.belongsTo(Category, {foreignKey: 'categoryId',as: 'owner'});

// User.hasMany(Registration, {foreignKey: 'userId', as: 'events'});
// Registration.belongsTo(User, {foreignKey: 'userId',as: 'owner'});

// Event.hasMany(Registration, {foreignKey: 'eventId', as: 'events'});
// Registration.belongsTo(Event, {foreignKey: 'eventId',as: 'owner'});


// export {
//     User,
//     Event,
//     Category,
//     Registration   
// }


export {
  User
}