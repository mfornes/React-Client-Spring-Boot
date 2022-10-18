# React-Client-Spring-Boot

#### This is an example of an application created with React, it is the frontend of a [Spring-Boot Rest api](https://github.com/mfornes/Spring-Boot).

- Requirements 
	- [Docker](https://docs.docker.com/engine/install/)

- Instructions
	- Start the Spring-Boot Rest api: https://github.com/mfornes/Spring-Boot.
	- Download the repository
	- Move to the root of the repository
	- Run the commands: 
		- docker build -t springboot_frontend-app .
		- docker run --name=frontend_app -d -p 8081:80 springboot_frontend-app
	- Access the application: http://localhost:8081