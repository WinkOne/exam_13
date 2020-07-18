const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User.js');
const Places = require('./models/Places.js');
const Comment = require('./models/Comment.js');
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin, jon, jack, marina, fedor] = await User.create({
        username: 'user',
        password: '123',
        token: '12343453453',
        displayName: 'User',
    }, {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        displayName: 'Антон Пикачу',
        token: '654',
    }, {
        username: 'jon',
        password: '123',
        displayName: 'Jon',
        role: 'user',
        token: '987',
    }, {
        username: 'jack',
        password: '123',
        displayName: 'Jack',
        role: 'user',
        token: '789',
    }, {
        username: 'marina',
        password: '123453783783',
        displayName: 'Marina',
        role: 'user',
        token: '456',
    }, {
        username: 'fedorinachkabluk',
        password: '123',
        displayName: 'Fedorinka',
        role: 'user',
        token: '123',
    });

    const [places1, places2, places3] = await Places.create({
        name: 'Globus',
        description: 'Globus -это продуктовый маркет который имеет многи точки доступа Города Бишкек. Здесь всегда можно найти скидки на разные товары. Дешевле чем магазинов обычных.',
        user: user,
        commentCount: 3,
        easyToMake: 15,
        quickToMake: 15,
        taste: 15,
        image: '../uploads/glob.jpeg',
        images: ['../uploads/gli1.png', '../uploads/gli2.png', '../uploads/gli3.jpg', '../uploads/gli4.jpg', '../uploads/gli5.jpg']
    }, {
        name: 'Globus',
        description: 'Globus -это продуктовый маркет который имеет многи точки доступа Города Бишкек. Здесь всегда можно найти скидки на разные товары. Дешевле чем магазинов обычных.',
        user: admin,
        commentCount: 3,
        easyToMake: 15,
        quickToMake: 15,
        taste: 15,
        image: '../uploads/glob.jpeg',
        images: ['../uploads/gli1.png', '../uploads/gli2.png', '../uploads/gli3.jpg', '../uploads/gli4.jpg', '../uploads/gli5.jpg']
    }, {
        name: 'Globus',
        description: 'Globus -это продуктовый маркет который имеет многи точки доступа Города Бишкек. Здесь всегда можно найти скидки на разные товары. Дешевле чем магазинов обычных.',
        user: jon,
        commentCount: 3,
        easyToMake: 15,
        quickToMake: 15,
        taste: 15,
        image: '../uploads/glob.jpeg',
        images: ['../uploads/gli1.png', '../uploads/gli2.png', '../uploads/gli3.jpg', '../uploads/gli4.jpg', '../uploads/gli5.jpg']
    });

    await Comment.create({
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places1,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: jack
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places1,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: marina
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places1,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: fedor
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places2,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: jack
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places2,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: marina
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places2,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: fedor
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places3,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: jack
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places3,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: marina
    }, {
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
        recipe: places3,
        easyToMake: 5.0,
        quickToMake: 5.0,
        taste: 5.0,
        user: fedor
    });
    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});