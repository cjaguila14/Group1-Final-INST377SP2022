/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import db from '../database/initializeDB.js';

const app = express.Router();

const dbQuery = `SELECT * FROM earthquake.earthquake_info;`;
const dbQuery2 = `SELECT * FROM earthquake.earthquake_info WHERE ROUND(magnitude,2) = :magnitude;`;


app.get('/earth_info', async(req, res) => {
    let result;
    try {
        result = await db.sequelizeDB.query(dbQuery, {
            type: sequelize.QueryTypes.SELECT
        });
        res.json(result)
    } catch (err) {
        console.log(err)
    }
});

app.get("/earth_info/:id", async(req, res) => {
    let result;
    try {
        result = await db.sequelizeDB.query(dbQuery, {
            type: sequelize.QueryTypes.SELECT
        });
        console.log(result)
        let filt = result.filter((obj) => {
            return obj.earthquake_id == req.params.id
        })
        res.send(filt)
    } catch (err) {
        console.log(err)
    }
})

// can try with req.body = {"magnitude": 6.7}
app.post("/earth_info", async(req, res) => {
    try {
        const mag = req.body ?.magnitude;

        const result = await db.sequelizeDB.query(dbQuery2, {
            replacements: { magnitude: mag },
            type: sequelize.QueryTypes.SELECT
        });
        res.json({ data: result });
    } catch (err) {
        console.log(err);
        res.send({ message: 'Something went wrong with your request' });
    }
})

app.put("/earth_info/:id", async(req, res) => {
    try {
        const mag = req.body ?.magnitude;
        const result = await db.sequelizeDB.query(dbQuery, {
            type: sequelize.QueryTypes.SELECT
        });
        const id = result.filter((obj) => {
            return obj.earthquake_id == req.params.id
        });
        id[0].magnitude = mag;
        res.send(id)
    } catch (err) {
        console.log(err);
    }
})

app.delete("/earth_info/:id", async(req, res) => {
    try {
        const result = await db.sequelize.query(dbQuery, {
            type: sequelize.QueryTypes.SELECT
        });
        const id = result.filter((obj) => {
            return obj.earthquake_id == req.params.id
        })

        delete result[id[0].earthquake_id - 1];
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})


export default app;