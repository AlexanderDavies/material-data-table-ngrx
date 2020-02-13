//function to normalize the port/ensure is a positive integer
exports.normalizePort = port => {
  const normalizedPort = parseInt(port);
  if (isNaN(normalizedPort)) {
    return port;
  }

  if (normalizedPort >= 0) {
    return normalizedPort;
  }

  return false;
};
