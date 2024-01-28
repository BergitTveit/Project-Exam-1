export function handleError(message = "Unknown error occured.") {
  console.error("Error:", message);
  return `<div class="error">"Error:"${message}</div>`;
}
