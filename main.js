import express from 'express';
import configViewEngine from './config/viewEngine.js';
const mysql = require('./config/connectDB.js');

const app = express();
const port = 3119;

configViewEngine(app);


app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/info', (req, res) => {
    res.render('pages/info');
});

app.get('/menu/search', async (req, res) => {
    try {
        var input = req.query.input;
        var stype = req.query.stype;
        let query = 1;
        if (stype == "name") query = "select * from dishes where lower(name) like '%" + input.toLowerCase() + "%' order by name;";
        else if (stype == "category") query = "select * from dishes where lower(category) like '%" + input.toLowerCase() + "%' order by name;";
        else if (stype == "origin") query = "select B.id as id, B.name as name, B.available as available from createdFrom as A, dishes as B, origin as C where A.dish_id = B.id and A.origin_id = C.id and lower(C.name) like '%" + input.toLowerCase() + "%' order by name;"
        const foods = await mysql.query(query);
        if (!foods[0][0]) res.render('error/notFound');
        else
        res.render('pages/menu', {foods: foods[0]});
    }
    catch (err) {
        res.render('error/cantConnect');
    }
});


app.get('/menu', async (req, res) => {
    try {
        const foods = await mysql.query("select * from dishes order by name");
        if (!foods[0][0]) res.render('error/notFound');
        else
        res.render('pages/menu', {foods: foods[0]});
    }
    catch (err) {
        res.render('error/cantConnect')
    }
});

app.get('/menu/food/:f', async (req, res) => {
    try {
        const foods = await mysql.query("select * from dishes where id = ?", req.params.f);
        const origin = await mysql.query("select C.name as name from createdFrom as A, dishes as B, origin as C where A.dish_id = B.id and A.origin_id = C.id and B.id = ?", req.params.f);
        const ingredient = await mysql.query("select group_concat(ingredients.name) as ingredients from dishes, ingredients, including where including.dish_id = dishes.id and including.ingre_id = ingredients.id and dishes.id = ?", req.params.f);
        res.render('pages/dishInfo', {foods: foods[0], origin: origin[0], ingredient: ingredient[0]});
    }
    catch (err) {
        res.render('error/cantConnect');
    }
});


app.listen(port, () => {
    console.log(`App listen at localhost:${port}`)
});
