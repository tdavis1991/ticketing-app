import DeleteBlock from "./DeleteBlock";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const TicketCard = ({ title, priority, description, date, status, id }) => {
  const truncatedDescription = description.slice(0, 100);

  const priorityIcons = Array.from({ length: priority }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={faFire} className="text-red-400" />
  ));

  const getStatusColor = (status) => {
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

  return (
    <Link
      href={`/TicketPage/${id}`}
      className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2"
    >
      <div className="flex mb-3 ">
        <div className="flex justify-start align-baseline">{priorityIcons}</div>
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h4>{title}</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">{truncatedDescription}...</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">{date}</p>
          {/* <ProgressBar /> Make this for the createdBy later */}
        </div>
        <div className="ml-auto flex items-end">
          <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
