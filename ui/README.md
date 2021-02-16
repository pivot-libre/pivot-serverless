# pivot-ui

## Requirements

 * nodejs v 10 +
 * npm

## Useful Commands

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```


## External Configuration

This app retrieves configuration at runtime from a config.json file from the root of the host serving the app. The app cannot start without it.
This configuration lets the app know where the web services are. Since this varies from tier to tier, it is not checked into the repo.
You can seed the configuration by copying `config.example.json` to `public/config.json`. See the [main README](../README.md) for instructions on how set the values in the file.  

See [Configuration Reference](https://cli.vuejs.org/config/).
