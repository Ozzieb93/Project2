const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/gram';
const port = process.env.PORT || 3000;

module.exports ={databaseURI, port};
