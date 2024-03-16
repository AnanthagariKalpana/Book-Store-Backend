import express from 'express';
import * as addressController from '../controllers/address.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add the address
router.post('', userAuth, addressController.addAddress);



export default router;