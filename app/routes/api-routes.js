const { Router } = require('express');
const router = Router();
const {
    getForecastMiddleware,
    getLocationMiddleware,
    getWeatherMiddleware,
    sendResponseMiddleware,
    welcomeMiddleware,
    createResponseDataMiddleware
} = require('../middlewares/index');

router.get(
    '/',
    welcomeMiddleware
  );

router.get(
  '/location',
  createResponseDataMiddleware,
  getLocationMiddleware,
  sendResponseMiddleware
);
router.get(
    '/current/:city?',
    createResponseDataMiddleware,
    getLocationMiddleware,
    getWeatherMiddleware,
    sendResponseMiddleware
);
router.get(
    '/forecast',
    createResponseDataMiddleware,
    getLocationMiddleware,
    getForecastMiddleware,
    sendResponseMiddleware
);
router.get(
    '/forecast/:city?',
    createResponseDataMiddleware,
    getLocationMiddleware,
    getForecastMiddleware,
    sendResponseMiddleware
);

module.exports = router;
