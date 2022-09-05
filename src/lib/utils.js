export function location() {
  const regex = /([^/]*)$/;
  const location = regex.exec(window.location.href)[0];
  return location;
}

export function before_(str) {
  return str.includes("_") ? str.substring(0, str.indexOf("_")) : str;
}
