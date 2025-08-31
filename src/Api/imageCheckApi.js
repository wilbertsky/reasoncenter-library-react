export default async function checkUrlFor404(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Using HEAD method for efficiency
    const placeHolder = "https://placehold.co/200x300/EEE/31343C?font=lato&text=Image%20Unavailable";

    if (response.status === 404) {
      return placeHolder;
    } else if (response.ok) { // Status code 200-299
      return url;
    } else {
      return placeHolder;
    }
  } catch (error) {
    return "https://placehold.co/200x300/EEE/31343C?font=lato&text=Image%20Unavailable"; // Treat network errors as non-existence for this purpose
  }
}