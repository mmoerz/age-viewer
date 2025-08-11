# cmd to start postgresql with apache/age 
docker run --name myPostgresDb -p 5455:5432 -e POSTGRES_USER=ageuser -e POSTGRES_PASSWORD=1sitonachair. -e POSTGRES_DB=postgresDB -d apache/age

# cmd to start apache/age-viewer
docker run --name apache-age -p 3000:3000 -e POSTGRES_USER=ageuser -e POSTGRES_PASSWORD=1sitonachair. -e POSTGRES_DB=postgresDB .