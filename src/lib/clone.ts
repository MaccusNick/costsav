function clone(data: unknown) {
  return JSON.parse(JSON.stringify(data));
}

export default clone;
