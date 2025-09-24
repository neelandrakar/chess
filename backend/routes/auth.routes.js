import express from 'express';
import { authRoutherPath } from '../variables/variables';
import authController from '../controllers/auth.controller';
const router = express.Router();

router.
  post('/sign-up', async, (req, res, next) => {
    try {

      const { username, password } = req?.body;

      if (!username || !password)
        throw new Error(`User name and password is required...`);

      const data = authController.signUp(username, password);


      res.status(200).send()

    } catch (e) {
      console.log(`Something went wrong at ${authRoutherPath}: `, e);
      throw e;
    }
  })