/* eslint-disable quotes */
/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB';

const dbQuery = 'SELECT * FROM weather';


const router = express.Router();

router.route('/weather/:weather_id').get(async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(dbQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    // eslint-disable-next-line eqeqeq
    res.json(result);
  } catch (err) {
    console.log(err);
  };

const router = express.Router();

router.route('/weather').get(async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(dbQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    // eslint-disable-next-line eqeqeq
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export default router;