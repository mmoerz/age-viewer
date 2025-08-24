import psycopg2

# Connection parameters – adjust as needed
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="postgres",
    user="postgres",
    password="noPWD1224."
)

cur = conn.cursor()

# Enable AGE
cur.execute("LOAD 'age';")
cur.execute("SET search_path = ag_catalog, \"$user\", public;")

# Create a graph (if not exists)
cur.execute("SELECT create_graph('example_graph');")

# Insert nodes
cur.execute("""
    SELECT * FROM cypher('example_graph', $$
        CREATE (a:Person {name: 'Alice'})
        CREATE (b:Person {name: 'Bob'})
        CREATE (c:Person {name: 'Carol'})
        RETURN a, b, c
    $$) as (a agtype, b agtype, c agtype);
""")

# Insert relationships
cur.execute("""
    SELECT * FROM cypher('example_graph', $$
        MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
        CREATE (a)-[:KNOWS]->(b)
    $$) as (a agtype);
""")

cur.execute("""
    SELECT * FROM cypher('example_graph', $$
        MATCH (b:Person {name: 'Bob'}), (c:Person {name: 'Carol'})
        CREATE (b)-[:KNOWS]->(c)
    $$) as (a agtype);
""")

conn.commit()

# Query the graph
cur.execute("""
    SELECT * FROM cypher('example_graph', $$
        MATCH (a:Person)-[:KNOWS]->(b:Person)
        RETURN a.name, b.name
    $$) as (a_name agtype, b_name agtype);
""")

for row in cur.fetchall():
    print(row)

cur.close()
conn.close()