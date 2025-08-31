export default async function getCollection(page, textFilter, distinct, genreFilterText, authorFilterText) {
  const paramObject = {
    'page': page,
    'title': textFilter,
    'distinct': distinct,
    'genre': genreFilterText,
    'author1': authorFilterText
  };

  // Filter out empty/null/undefined values
  const filteredParams = Object.fromEntries(
    Object.entries(paramObject).filter(([key, value]) => {
      // Exclude null, undefined, and empty strings
      return value !== null && value !== undefined && value !== '';
      // For more comprehensive checks, you might include:
      // return value !== null && value !== undefined && value !== '' && value !== 0 && !isNaN(value);
    })
  );

  const searchParams = new URLSearchParams(filteredParams).toString();
  let baseUrl = `https://localhost/api/books?`;
  if ('author1' === distinct) {
    baseUrl = `https://localhost/api/authors?`
  }
  const url = `${baseUrl}${searchParams}`;

  return await fetch(url)
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