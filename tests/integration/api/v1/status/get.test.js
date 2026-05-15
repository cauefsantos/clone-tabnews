test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("GET to /api/v1/status should return responseBody with correct format", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("PostgreSQL version should be 16.0", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const databaseVersion = responseBody.dependencies.database.version;
  expect(databaseVersion).toBe("16.0");
});

test("PostgreSQL max_connections should be equal to 100", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toEqual(100);
});

test("PostgreSQL opened_connections should be equal to 1", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const openedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(openedConnections).toEqual(1);
});
