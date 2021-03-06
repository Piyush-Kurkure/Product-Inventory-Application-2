export default async function graphQLFetch(query, variables = {}, showError = null) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        // alert(`${error.message}:\n ${details}`);
        if (showError) showError(`${error.message}:\n ${details}`);
      } else if (showError) {
        // alert(`${error.extensions.code}: ${error.message}`);
        showError(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    // alert(`Error in sending data to server: ${e.message}`);
    if (showError) showError(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
