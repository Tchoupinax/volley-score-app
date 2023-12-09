import PG from 'pg'
import PARSER from 'pg-connection-string'

const { appConfig } = useRuntimeConfig();

export async function executeSQL (
  query: string,
  params?: Array<string>
) {
  const { url } = appConfig.postgres;
  const opts: PARSER.ConnectionOptions = PARSER.parse(url)

  const client = new PG.Client({
    database: opts.database!,
    host: opts.host!,
    password: opts.password,
    port: parseInt(opts.port!, 10),
    user: opts.user,
    ssl: true
  });
  await client.connect();

  const res = await client.query(query, params);

  await client.end();
  return res.rows;
}
