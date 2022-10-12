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
        appId: '1343047569561935',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    },
};