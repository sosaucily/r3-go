export function action(type, payload = {}) {
  return { type, ...payload };
}
