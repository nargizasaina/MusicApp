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
        image: 'fixtures/ed.jpeg'
    }, {
        title: 'Frank Sinatra',
        image: 'fixtures/frank.jpeg',
        description: 'Francis Albert Sinatra (/sɪˈnɑːtrə/; December 12, 1915 – May 14, 1998) was an American singer and actor. Nicknamed the "Chairman of the Board" and later called Ole \'Blue Eyes, Sinatra was one of the most popular entertainers of the 1940s, 1950s and 1960s.',
    }, {
        title: 'Dua Lipa',
        image: 'fixtures/dua.jpeg'
    });

    const [albumX, albumMyWay, albumSwing, albumFuture] = await Album.create({
        title: 'X',
        artist: artistEd._id,
        year: 2017,
        image: 'fixtures/eda1.jpeg',
    }, {
        title: 'My Way',
        artist: artistFrank._id,
        year: 1969,
        image: 'fixtures/franka1.jpeg',
    }, {
        title: 'Swing',
        artist: artistFrank._id,
        year: 1954,
        image: 'fixtures/franka2.jpeg',
    }, {
        title: 'Future Nostalgia',
        artist: artistDua._id,
        year: 2020,
        image: 'fixtures/duaa1.jpeg',
    });

    await Track.create({
        title: 'X',
        album: albumX._id,
        length: '2:40',
        number: 1
    }, {
        title: 'Xy',
        album: albumX._id,
        length: '2:45',
        number: 2
    }, {
        title: 'Xa',
        album: albumX._id,
        length: '2:55',
        number: 3
    }, {
        title: 'Xoxox',
        album: albumX._id,
        length: '3:45',
        number: 4
    }, {
        title: 'Xo',
        album: albumX._id,
        length: '3:25',
        number: 5
    }, {
        title: 'My Way',
        album: albumMyWay._id,
        length: '4:45',
        number: 6
    }, {
        title: 'Your Way',
        album: albumMyWay._id,
        length: '4:55',
        number: 7
    }, {
        title: 'My Ways',
        album: albumMyWay._id,
        length: '2:45',
        number: 8
    }, {
        title: 'My',
        album: albumMyWay._id,
        length: '4:15',
        number: 9
    }, {
        title: 'Way',
        album: albumMyWay._id,
        length: '4:05',
        number: 10
    }, {
        title: 'Not My Way',
        album: albumMyWay._id,
        length: '4:40',
        number: 11
    }, {
        title: 'Swing',
        album: albumSwing._id,
        length: '4:40',
        number: 12
    }, {
        title: 'My Swing',
        album: albumSwing._id,
        length: '4:10',
        number: 13
    }, {
        title: 'Swing With Me',
        album: albumSwing._id,
        length: '4:00',
        number: 14
    }, {
        title: 'Swing By Me',
        album: albumSwing._id,
        length: '3:40',
        number: 15
    }, {
        title: 'Swing For Me',
        album: albumSwing._id,
        length: '2:40',
        number: 16
    }, {
        title: 'Swing and Dance',
        album: albumSwing._id,
        length: '1:40',
        number: 17
    }, {
        title: 'JustSwing',
        album: albumSwing._id,
        length: '5:40',
        number: 18
    }, {
        title: 'Future Nostalgia',
        album: albumFuture._id,
        length: '5:20',
        number: 19
    }, {
        title: 'Future',
        album: albumFuture._id,
        length: '4:40',
        number: 20
    }, {
        title: 'Nostalgia',
        album: albumFuture._id,
        length: '3:40',
        number: 21
    }, {
        title: 'Present Nostalgia',
        album: albumFuture._id,
        length: '2:40',
        number: 22
    }, {
        title: 'Future Memories',
        album: albumFuture._id,
        length: '5:45',
        number: 23
    }, {
        title: 'Past Nostalgia',
        album: albumFuture._id,
        length: '5:40',
        number: 24
    }, {
        title: 'Past Memories',
        album: albumFuture._id,
        length: '5:47',
        number: 25
    }, {
        title: 'Just Me',
        album: albumFuture._id,
        length: '5:00',
        number: 26
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

