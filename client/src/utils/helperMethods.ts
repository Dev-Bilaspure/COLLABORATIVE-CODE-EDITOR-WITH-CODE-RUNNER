export const getFileExtension = (language) => {
  switch (language) {
    case "cpp17":
      return ".cpp";
    case "c":
      return ".c";
    case "python3":
      return ".py";
    case "java":
      return ".java";
    case "nodejs":
      return ".js";
    case "kotlin":
      return ".kt";
    case "csharp":
      return ".cs";
    case "go":
      return ".go";
    case "rust":
      return ".rs";
    case "ruby":
      return ".rb";
    case "scala":
      return ".scala";
    case "dart":
      return ".dart";
    case "php":
      return ".php";
    default:
      return ".txt";
  }
};

export function formatDate(inputDate) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const amPm = hour >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute.toString().padStart(2, "0");

  const formattedDate = `${day} ${month} ${formattedHour}:${formattedMinute} ${amPm}`;
  return formattedDate;
}