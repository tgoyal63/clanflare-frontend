// url
// const url =
//   "https://docs.google.com/spreadsheets/d/1sLT8Rn1_MvmOt_IWGC3Uda5y4elfEp3wtdgJbn0Vbb8/edit?usp=sharing";

// const match = url.match(/\/d\/(.*?)\/edit/);

// if (match) {
//   const extractedString = match[1];
//   console.log(extractedString); // This will print '1sLT8Rn1_MvmOt_IWGC3Uda5y4elfEp3wtdgJbn0Vbb8'
// } else {
//   console.log("Match not found");
// }

/** extracts id from googleSheet url
 * ex-input: "https://docs.google.com/spreadsheets/d/1sLT8Rn1_MvmOt_IWGC3Uda5y4elfEp3wtdgJbn0Vbb8/edit?usp=sharing";
 * output: 1sLT8Rn1_MvmOt_IWGC3Uda5y4elfEp3wtdgJbn0Vbb8
 */
export function extractIdFromSheetUrl(url: string) {
  const match = url.match(/\/d\/(.*?)\/edit/);

  if (match) {
    const extractedString = match[1];
    // console.log(extractedString); // This will print '1sLT8Rn1_MvmOt_IWGC3Uda5y4elfEp3wtdgJbn0Vbb8'
    return extractedString;
  } else {
    console.log("Match not found");
    return "";
  }
}
