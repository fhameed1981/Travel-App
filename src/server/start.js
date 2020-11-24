// Declaring port here allows for server.js file to handle multiple Jest tests
// at the same time

const app = require('./server')

// Designates what port the app will listen to for incoming requests
const port = 8081
app.listen(port,
    () => console.log(`Travel app listening on port ${port}!`)
)