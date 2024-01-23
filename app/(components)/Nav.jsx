"use client";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { data: session, status } = useSession();
  console.log("SESSION:", session);
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-default-text">{session?.user.email}</p>
        <Image
          src={session?.user.image}
          alt="User avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Nav;
