// const addDateSuffix = (date) => {
//     let dateStr = date.toString();

//     // Get the last character of the string
//     const lastChar = dateStr.charAt(dateStr.length - 1);

//     // Check for special cases where the suffix is not "th"
//     if (lastChar === "1" && dateStr !== "11") {
//         dateStr += "st";
//     } else if (lastChar === "2" && dateStr !== "12") {
//         dateStr += "nd";
//     } else if (lastChar === "3" && dateStr !== "13") {
//         dateStr += "rd";
//     } else {
//         dateStr += "th"; // For all other cases, use "th" as suffix
//     }

//     return dateStr;
// };

