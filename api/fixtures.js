const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [artistEd, artistFrank, artistDua] = await Artist.create({
        title: 'Ed Sheeran',
        image: 'fixtures/ed.jpeg',
        publish: true
    }, {
        title: 'Frank Sinatra',
        image: 'fixtures/frank.jpeg',
        description: 'Francis Albert Sinatra (/sɪˈnɑːtrə/; December 12, 1915 – May 14, 1998) was an American singer and actor. Nicknamed the "Chairman of the Board" and later called Ole \'Blue Eyes, Sinatra was one of the most popular entertainers of the 1940s, 1950s and 1960s.',
        publish: true
    }, {
        title: 'Dua Lipa',
        image: 'fixtures/dua.jpeg',
        publish: true
    });

    const [albumX, albumMyWay, albumSwing, albumFuture] = await Album.create({
        title: 'X',
        artist: artistEd._id,
        year: 2017,
        image: 'fixtures/eda1.jpeg',
        publish: false
    }, {
        title: 'My Way',
        artist: artistFrank._id,
        year: 1969,
        image: 'fixtures/franka1.jpeg',
        publish: true
    }, {
        title: 'Swing',
        artist: artistFrank._id,
        year: 1954,
        image: 'fixtures/franka2.jpeg',
        publish: true
    }, {
        title: 'Future Nostalgia',
        artist: artistDua._id,
        year: 2020,
        image: 'fixtures/duaa1.jpeg',
        publish: true
    });

    await Track.create({
        title: 'X',
        album: albumX._id,
        length: '2:40',
        number: 1,
        publish: false
    }, {
        title: 'Xy',
        album: albumX._id,
        length: '2:45',
        number: 2,
        publish: false
    }, {
        title: 'Xa',
        album: albumX._id,
        length: '2:55',
        number: 3,
        publish: false
    }, {
        title: 'Xoxox',
        album: albumX._id,
        length: '3:45',
        number: 4,
        publish: true
    }, {
        title: 'Xo',
        album: albumX._id,
        length: '3:25',
        number: 5,
        publish: true
    }, {
        title: 'My Way',
        album: albumMyWay._id,
        length: '4:45',
        number: 6,
        publish: true
    }, {
        title: 'Your Way',
        album: albumMyWay._id,
        length: '4:55',
        number: 7,
        publish: true
    }, {
        title: 'My Ways',
        album: albumMyWay._id,
        length: '2:45',
        number: 8,
        publish: true
    }, {
        title: 'My',
        album: albumMyWay._id,
        length: '4:15',
        number: 9,
        publish: true
    }, {
        title: 'Way',
        album: albumMyWay._id,
        length: '4:05',
        number: 10,
        publish: true
    }, {
        title: 'Not My Way',
        album: albumMyWay._id,
        length: '4:40',
        number: 11,
        publish: true
    }, {
        title: 'Swing',
        album: albumSwing._id,
        length: '4:40',
        number: 12,
        publish: true
    }, {
        title: 'My Swing',
        album: albumSwing._id,
        length: '4:10',
        number: 13,
        publish: true
    }, {
        title: 'Swing With Me',
        album: albumSwing._id,
        length: '4:00',
        number: 14,
        publish: true
    }, {
        title: 'Swing By Me',
        album: albumSwing._id,
        length: '3:40',
        number: 15,
        publish: true
    }, {
        title: 'Swing For Me',
        album: albumSwing._id,
        length: '2:40',
        number: 16,
        publish: true
    }, {
        title: 'Swing and Dance',
        album: albumSwing._id,
        length: '1:40',
        number: 17,
        publish: true
    }, {
        title: 'JustSwing',
        album: albumSwing._id,
        length: '5:40',
        number: 18,
        publish: true
    }, {
        title: 'Future Nostalgia',
        album: albumFuture._id,
        length: '5:20',
        number: 19,
        publish: true
    }, {
        title: 'Future',
        album: albumFuture._id,
        length: '4:40',
        number: 20,
        publish: true
    }, {
        title: 'Nostalgia',
        album: albumFuture._id,
        length: '3:40',
        number: 21,
        publish: true
    }, {
        title: 'Present Nostalgia',
        album: albumFuture._id,
        length: '2:40',
        number: 22,
        publish: true
    }, {
        title: 'Future Memories',
        album: albumFuture._id,
        length: '5:45',
        number: 23,
        publish: true
    }, {
        title: 'Past Nostalgia',
        album: albumFuture._id,
        length: '5:40',
        number: 24,
        publish: true
    }, {
        title: 'Past Memories',
        album: albumFuture._id,
        length: '5:47',
        number: 25,
        publish: true
    }, {
        title: 'Just Me',
        album: albumFuture._id,
        length: '5:00',
        number: 26,
        publish: true
    });

    await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin'
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
        role: 'user'
    });

    await mongoose.connection.close();
};

run().catch(console.error);

