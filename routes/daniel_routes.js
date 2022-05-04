// Daniel M
import express from 'express';
import sequelize from 'sequelize';
import db from '../database/initializeDB.js';

const app = express.Router();

const dbQuery = `SELECT * FROM earthquake.earthquake_info;`;
const dbQuery2 = `SELECT * FROM earthquake.earthquake_info WHERE ROUND(magnitude,2) = :magnitude;`;
const dbQuery3 = ` 
SELECT date, latitude, longitude, magnitude, depth, state_name, buildings_impacted.num_home_damaged, buildings_impacted.people_displaced
FROM earthquake_info
LEFT JOIN states_has_earthquake_info
ON states_has_earthquake_info.earthquake_id = earthquake_info.earthquake_id
LEFT JOIN states
ON states_has_earthquake_info.state_id = states.state_id
LEFT JOIN buildings_impacted
ON earthquake_info.earthquake_id = buildings_impacted.earthquake_id
WHERE state_name = :stater
ORDER BY date ASC;`;


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
    console.log(req.body)
    try {
        const state = req.body?.state;
        console.log(state);
        const result = await db.sequelizeDB.query(dbQuery3, {
            replacements: { stater: state },
            type: sequelize.QueryTypes.SELECT
        });
        res.json({ data: result });
    } catch (err) {
        console.log(err);
        res.send({ message: 'Something went wrong with your request' });
    }
})


// app.put("/earth_info/:id", async(req, res) => {
//     try {
//         const mag = req.body ?.magnitude;
//         const result = await db.sequelizeDB.query(dbQuery, {
//             type: sequelize.QueryTypes.SELECT
//         });
//         const id = result.filter((obj) => {
//             return obj.earthquake_id == req.params.id
//         });
//         id[0].magnitude = mag;
//         res.send(id)
//     } catch (err) {
//         console.log(err);
//     }
// })

// app.delete("/earth_info/:id", async(req, res) => {
//     try {
//         const result = await db.sequelize.query(dbQuery, {
//             type: sequelize.QueryTypes.SELECT
//         });
//         const id = result.filter((obj) => {
//             return obj.earthquake_id == req.params.id
//         })

//         delete result[id[0].earthquake_id - 1];
//         res.send(result)
//     } catch (err) {
//         res.send(err)
//     }
// })


export default app;