export function useBaseUrlStore() {
  // プロトコルとホストを取得してベースのURLを返す。
  // 例）　http://localhost:3000/
  const protocol = window.location.protocol;
  const host = window.location.host;
  const baseUrl = `${protocol}//${host}`;
  return baseUrl;
}
