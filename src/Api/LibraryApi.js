export default async function getCollection(page, textFilter) {
  return await fetch(`https://localhost/api/books?page=${page}&title=${textFilter}`)
    .then(response => {
      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response body as JSON
      return response.json();
    })
    .then(data => {
      // Handle the successful data
      return data;
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or processing
      return error;
    })
    .finally(() => {
      // This block will always execute, regardless of success or failure
    });
}