# make network
docker network create age-network

# cmd to build
docker build -t apache-age-viewer .

# cmd to start postgresql with apache/age 
docker run --name apache-age --network age-network -p 5455:5432 -e POSTGRES_USER=ageuser -e POSTGRES_PASSWORD=1sitonachair. -e POSTGRES_DB=postgresDB -d apache/age

# cmd to start apache/age-viewer
docker rm apache-age-viewer
docker run --name apache-age-viewer --network age-network -p 3000:3000 -e POSTGRES_USER=ageuser -e POSTGRES_PASSWORD=1sitonachair. -e POSTGRES_DB=postgresDB apache-age-viewer