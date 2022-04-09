import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Express'});
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', {title: 'Express'});
});

export default router;