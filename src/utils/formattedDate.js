function formattedDate(isoString) {
  const date = new Date(isoString);

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("id-ID", options);

  return formattedDate;
}

export default formattedDate;