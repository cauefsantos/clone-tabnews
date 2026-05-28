import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      const databaseVersion = responseBody.dependencies.database.version;
      const maxConnections = responseBody.dependencies.database.max_connections;
      const openedConnections =
        responseBody.dependencies.database.opened_connections;

      expect(response.status).toBe(200);
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
      expect(databaseVersion).toBe("16.0");
      expect(maxConnections).toEqual(100);
      expect(openedConnections).toEqual(1);
    });
  });
});
