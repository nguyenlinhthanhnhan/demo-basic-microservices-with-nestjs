# MicroserviceLearn
## App use for demo microservices with point of view from newbie in Microservices pattern

### How to run
#### Prerequisite
- NodeJS 16++ installed
- Docker installted
- NestJs installed

#### Pull docker image:
PostgresSQL
```console 
docker pull postgres
```
Run PostgresSQL image
```console
docker run -p 5432:5432 --name postgresSQL -e POSTGRES_PASSWORD=[yourPassword] -d postgres
```
MongoDb
```console
docker pull mongo
```
Run MongdoDb image
```console
docker run -p 27017:27017 --name practice-microservice-user-db -d mongo
```
#### Install package to all project (3 project have currently)
```console
npm install
```
#### After done all, go to per project, and run
```console
npm start
```
then move to localhost:[3000 - 3001 - 3002]/api to use API
