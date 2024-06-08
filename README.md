# Weather API

# Run project
```
npm run start
```

# Run tests with docker
```
npm run test
```

# Installation Steps

- Install NODEJS
- Install NPM
- Run with npm run start

# ENDPOINTS

/location
Get actual location based on IP-API.

Response:
```
[
  {
    "city": "Ramos Mejia",
    "lat": -00.0000,
    "lon": -00.0000,
    "region": "Buenos Aires",
    "country": "Argentina"
  }
]
```

/current/:city?
If don't pass city, get current location's weather based on IP-API and using Open Weather Map. For default get 1 result. If pass query param limit, results are based in the limit.

Response:

```
[
  {
    "city": "Ramos Mejia",
    "lat": -00.0000,
    "lon": -00.0000,
    "region": "Buenos Aires",
    "country": "Argentina",
    "weather": {...}  // Current weather info from Open Weather Map
  }
]
```


/forecast/:city?
If don't pass city, get current location's forecast for 5 days based on IP-API and using Open Weather Map. For default get 1 result. If pass query param limit, results are based in the limit.

Response:

```
[
  {
    "city": "Ramos Mejia",
    "lat": -34.6311,
    "lon": -58.5591,
    "region": "Buenos Aires",
    "country": "Argentina",
    "forecast": [ // Forecast info from Open Weather Map
      {...},
      {...},
      {...},
      {...},
      {...}
    ]
  }
]
```

