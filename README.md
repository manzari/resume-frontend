# resume-frontend
This is a React frontend for my [resume backend](https://github.com/manzari/resume-backend).

## Develop
Start the docker container used for development and execute the start script to bring up the development server.
There are many approaches to do so, find an example below.
```bash
sudo docker-compose -f docker-compose.develop.yml up -d \
 && sudo docker exec -it resume_frontend_dev ash
npm start
```

### After changing svg assets
```bash
npx @svgr/cli --out-dir src/assets -- src/assets
```

## Deploy
Eventually modify `docker-compose.prod.yml` and run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`.
