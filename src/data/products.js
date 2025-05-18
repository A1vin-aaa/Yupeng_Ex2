// src/data/products.js

const products = [
    {
        id: '1',
        name: 'Soccer Ball',
        price: 19.99,
        image: require('../images/soccer_ball.png'),
        category: 'Ball',
        description: 'Official size 5 soccer ball made from durable PU leather, suitable for both training and match play.'
    },
    {
        id: '2',
        name: 'Basketball',
        price: 14.99,
        image: require('../images/basketball_ball.jpg'),
        category: 'Ball',
        description: 'Indoor/outdoor composite leather basketball with deep channels for superior grip and control.'
    },
    {
        id: '3',
        name: 'Tennis Racket',
        price: 89.99,
        image: require('../images/tennis_racket.jpg'),
        category: 'Racket',
        description: 'Lightweight graphite racket with large sweet spot and vibration-dampening handle for comfort.'
    },
    {
        id: '4',
        name: 'Tennis Balls (Pack of 3)',
        price: 9.99,
        image: require('../images/tennis_balls.jpg'),
        category: 'Ball',
        description: 'Pressurized tennis balls in a three-ball can, offering consistent bounce and durability.'
    },
    {
        id: '5',
        name: 'Baseball Glove',
        price: 49.99,
        image: require('../images/baseball_glove.jpg'),
        category: 'Glove',
        description: 'Professional-grade leather baseball glove with padded palm and reinforced webbing.'
    },
    {
        id: '6',
        name: 'Baseball Bat',
        price: 59.99,
        image: require('../images/baseball_bat.jpg'),
        category: 'Bat',
        description: 'Alloy baseball bat certified for league play, featuring an ergonomic grip for better swing control.'
    },
    {
        id: '7',
        name: 'Volleyball',
        price: 12.99,
        image: require('../images/volleyball_ball.jpg'),
        category: 'Ball',
        description: 'Soft-touch volleyball with nylon wound bladder, ideal for indoor and beach games.'
    },
    {
        id: '8',
        name: 'Skateboard',
        price: 49.99,
        image: require('../images/skateboard_board.jpg'),
        category: 'Board',
        description: 'Maple plywood deck skateboard with 52mm PU wheels and precision bearings for smooth rides.'
    },
    {
        id: '9',
        name: 'Snowboard',
        price: 199.99,
        image: require('../images/snowboard_board.jpg'),
        category: 'Board',
        description: 'All-mountain snowboard with camber profile, offering stability at speed and versatile carving.'
    }
];

export default products;
