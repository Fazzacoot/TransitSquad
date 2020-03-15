# Transit Test

To get started please clone the repo into a folder of your choosing. Once downloaded you can run it in development mode or launch a docker image of the build

# Dev

Install node_modules

```
npm install
```

Start Project

```
npm start
```

Run Tests

```
npm test
```

## Docker Image

Build Image

```bash
docker build -t <identifying name>/<application name> .
```

Check image has been created

```bash
docker images
```

Run image:

#### Please note the <port> can be replaced with whatever port you want the docker image to serve the application on. 3000 must stay as it is the port that the node application uses.

```bash
docker run -p <port>:3000 -d <your username>/node-web-app
```

Get docker container ID

```bash
docker ps
```

Stop Container

```bash
docker stop <containerID>
```
