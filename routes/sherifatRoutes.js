/* eslint-disable quotes */
/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const dbQuery = 'SELECT * FROM weather';

const router = express.Router();

// Retrieves from the weather table
router.route('/weather')
  .get(async (req, res) => {
    try {
      const result = await db.sequelizeDB.query(dbQuery, {
        type: sequelize.QueryTypes.SELECT
      });
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  });

router.route('/weather/:weather_id').get(async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(dbQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    // eslint-disable-next-line eqeqeq
    const specificId = result.filter((obj) => obj.weather_id == req.params.weather_id);
    res.json(specificId);
  } catch (err) {
    console.log(err);
  }
});

export default router;