export const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "text-black bg-green-200";
    case "in-progress":
      return "text-black bg-orange-200"; // Adjust the color class accordingly
    case "resolved":
      return "text-black bg-blue-200"; // Adjust the color class accordingly
    case "closed":
      return "text-white bg-gray-500"; // Adjust the color class accordingly
    default:
      return "text-black bg-gray-200"; // Default color
  }
};
