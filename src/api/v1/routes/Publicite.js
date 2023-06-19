import  express  from "express";
import {
    getPublicites,
    getPubliciteById,
    createPublicite,
    updatePublicite,
    deletePublicite
} from '../services/Publicite.js'
const router = express.Router();

router.get('/publicites',getPublicites);
router.get('/publicites/:id',getPubliciteById);
router.post('/walou/add',createPublicite);
router.patch('/walou/edit/:id',updatePublicite);
router.delete('/walou/delete/:id',deletePublicite);

export default router;