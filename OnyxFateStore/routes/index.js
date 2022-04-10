"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});
router.post('/signupinfo', (req, res) => {
    return res.redirect('https://www.youtube.com/watch?v=0tOgMSEPFRs');
});
exports.default = router;
//# sourceMappingURL=index.js.map