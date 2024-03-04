//import statements 
const router = require('express').Router();
const apiRouters = require('./api');


//This is middleware
router.use('/api', apiRouters)

router.use((req, res) => res.send('Wrong route!'));

//export
module.exports = router;