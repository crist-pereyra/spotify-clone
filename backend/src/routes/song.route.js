import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Song route with GET');
});

export default router;