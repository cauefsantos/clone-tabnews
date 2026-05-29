import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2 * 1000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let databaseStatusData = "Carregando...";

  if (!isLoading && data) {
    databaseStatusData = (
      <>
        <p>Versão do banco de dados: {data.dependencies.database.version}</p>
        <p>Máximo de conexões: {data.dependencies.database.max_connections}</p>
        <p>Conexões abertas: {data.dependencies.database.opened_connections}</p>
      </>
    );
  }

  return databaseStatusData;
}
