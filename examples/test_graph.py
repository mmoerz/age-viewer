#!/usr/bin/env python3
# Example script to create a graph in PostgreSQL with AGE extension
# This script creates a graph named 'test1', adds 20 Person nodes with random ages,
# and creates random "is_friend" edges between them.

import psycopg2
import random

# Database connection settings
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASS = "noPWD1224."
DB_HOST = "localhost"
DB_PORT = 5432

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT
)
cur = conn.cursor()

# Load AGE extension (if not already done)
cur.execute("LOAD 'age';")
cur.execute("SET search_path = ag_catalog, \"$user\", public;")

# Drop graph if it exists
cur.execute("SELECT * FROM drop_graph('test1', true);")

# Create graph
cur.execute("SELECT * FROM create_graph('test1');")

# Insert 20 Person nodes
people = []
for i in range(20):
    name = f"Person{i+1}"
    age = random.randint(18, 70)
    cypher = f"""
        SELECT * FROM cypher('test1', $$
            CREATE (n:Person {{name: '{name}', age: {age}}})
            RETURN n
        $$) as (n agtype);
    """
    cur.execute(cypher)
    people.append(name)
    print(f"Inserted node: {name}, age: {age}")

# Create random "is_friend" edges
for i in range(30):  # 30 random edges
    p1, p2 = random.sample(range(20), 2)
    cypher = f"""
        SELECT * FROM cypher('test1', $$
            MATCH (a:Person {{name: '{people[p1]}'}}), (b:Person {{name: '{people[p2]}'}})
            CREATE (a)-[:IS_FRIEND]->(b)
        $$) as (e agtype);
    """
    cur.execute(cypher)

conn.commit()
print("Graph 'test1' created with 20 Person nodes and IS_FRIEND edges.")

cur.close()
conn.close()