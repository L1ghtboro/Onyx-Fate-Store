import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Main Page'});
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', {title: 'Login Page'});
});

router.post('/signupinfo', (req: express.Request, res: express.Response) => {
    //Your mom
}); 

export default router;