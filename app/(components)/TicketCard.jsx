import DeleteBlock from "./DeleteBlock";
import { getStatusColor } from "@/utils/statusColor";
import { faFire, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const TicketCard = ({ title, priority, description, date, status, id }) => {
  const truncatedDescription = description.slice(0, 100);

  const priorityIcons = Array.from({ length: priority }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={faFire} className="text-red-400" />
  ));

  return (
    <Link
      href={`/TicketPage/${id}`}
      className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2"
    >
      <div className="mb-3 ">
        <div className="flex justify-start align-baseline">{priorityIcons}</div>
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
