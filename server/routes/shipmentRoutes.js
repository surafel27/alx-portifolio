const router = require('../app.js');
const shipmateModle = require("../models/shipmentModel");


router.post('/postRequest', async (req, res) => {
    try {
        const {from, to, history, weight, packageDate, packagePrice} =req.body;
        if (!from || !to || !history || !weight || !packageDate || !packagePrice) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const packageData = {
            from,
            to,
            history,
            weight,
            packageDate, 
            packagePrice
        };
        shipmateModle.createPackage(packageData, (error, data) => {
            if (error) {
                console.log(error)
            }
        });
        console.log("Package request added sucessfully");

    }catch (err) {
  console.error(err);
  console.log('Error signing up');
}
});

router.get('/getRequests', (req, res) =>{
    shipmateModle.getRequest((error, data) => {
        if (error) {
            console.log(error);
        }
        return res.json(data)
    }); 
});

module.exports = router