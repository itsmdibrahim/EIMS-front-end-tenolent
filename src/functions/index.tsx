export function formatDateToMMDDYYYY(dateString: Date) {
  const date = new Date(dateString);

  // Get month, day, and year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so we add 1
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Return formatted date as MM-DD-YYYY
  return `${month}-${day}-${year}`;
}
export function addMissingKeys(obj: any, keysArray: any) {
  // Iterate through each key in the array
  keysArray.forEach((key: any) => {
    // If the key is not present in the object, set it to 0
    if (!obj.hasOwnProperty(key)) {
      obj[key] = 0;
    }
  });
  return obj;
}
export function getFormattedMonth() {
  const now = new Date();
  const year = now.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad with 0 if needed
  return `${year}-${month}`;
}
