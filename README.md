# my-link-shorter-ui

`my-link-shorter-ui` is a frontend app, part of [my CS B. Eng. diploma project](https://github.com/tomaszkyc/diploma-project)

## Installation

1. Make sure you have installed and running [Docker](https://www.docker.com/).

2. Make sure the backend app is running. Check [this link for details.](https://github.com/...)

3. Run commands:

```shell script
docker build -t mylinkshorterui:prod . # this will take a while depending of your machine
docker run -d -p 8888:80 --name app-ui --network=my-link-shorter-api_backend mylinkshorterui:prod
```

## Usage

After commands from the step above open web browser and go to address [of application](localhost:80)

## Contributing

Contribution disabled because this is finished project. It will not be developed in future.

## License
[MIT](https://choosealicense.com/licenses/mit/)
