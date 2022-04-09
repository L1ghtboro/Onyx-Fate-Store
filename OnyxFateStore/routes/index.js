"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Express' });
});
exports.default = router;
//# sourceMappingURL=index.js.map