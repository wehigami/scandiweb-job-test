export function location() {
  const regex = /([^/]*)$/;
  const location = regex.exec(window.location.href)[0];
  return location;
}
