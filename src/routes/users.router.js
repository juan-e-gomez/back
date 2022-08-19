import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {

})

router.post('/', async(req, res) => {
    try {
        let user = await db('users').insert(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/:uid', (req, res) => {

})

router.delete('/:uid', (req, res) => {

})



export default router;