export const request = async (url, method = 'GET', body = null, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      let error = {};
      if (response.status === 401 || response.status === 403) {
        error.statusCode = response.status;
        error.message = 'Authorization is invalid';
      } else {
        error = new Error(JSON.parse(data).message || 'Something went wrong');
      }
      throw error;
    }

    return data;

  } catch (e) {
    throw e;
  }
};
