import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("respond with a resource");
});

router.get('/history', (req: express.Request, res: express.Response) => {
    //profile.pug -> history.pug

    //Don't need to check if logged

    //Browse User transaction history and if have income+
});

router.get('/profile', (req: express.Request, res: express.Response) => {
    //Check if logged - render profile.pug

    //if not - send to BRAZIL
});


export default router;