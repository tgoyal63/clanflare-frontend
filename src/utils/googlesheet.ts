export function extractIdFromSheetUrl(url: string) {
  const match = url.match(/\/d\/(.*?)\/edit/);

  if (match) {
    const extractedString = match[1];
    return extractedString;
  } else {
    console.log("Match not found");
    return "";
  }
}
