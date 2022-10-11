const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/musicApp',
        options: {useNewUrlParser: true}
    },
    facebook: {
        appId: '783100086141460',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};