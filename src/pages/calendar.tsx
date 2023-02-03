/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from "../utils/api";
//1. Capture input in State object. [DONE]
//2. Use object in State to Mutate to database. [DONE]
//3. query database for newly posted input. [DONE]
//4. Map db to create a list of input. [DONE]

const Calendar: NextPage = () => {
  const queryUserJobList = api.jobs.getAllUserJobs.useQuery();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;
  const events = queryUserJobList.data?.filter((job) => job.userId === userId).map((x) => ({
    title: x.jobName,
    start: x.appliedon,
    end: x.interview,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderEventContent(eventInfo:any) {
    const { title, start, end } = eventInfo.events;
    
    return (
      <>
        <b>{title}</b>
        <i>{start.toString()}</i>
        <i>{end.toString()}</i>
      </>
    );
  }

  return (
    <>
      <div className="mb-2 flex flex-row justify-end">
        <AuthShowcase />
      </div>
      <div className="flex justify-around gap-3 bg-slate-400 p-3">
        <div className="flex flex-row gap-2">
          <Link
            href="/"
            type="button"
            className="flex flex-row items-center gap-2 rounded-md bg-blue-400 p-2 text-sm transition hover:bg-blue-500"
          >
            Back to Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="  gap-3 p-3">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
        />
      </div>
    </>
  );
};
export default Calendar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myImage: any = sessionData && sessionData.user?.image;
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && (
        <img
          src={myImage}
          alt="user avatar"
          className="h-20 w-20 rounded-full"
        />
      )}
      <button
        className="hover:bg-slate/20 rounded-full bg-slate-700 px-10 py-3 font-semibold text-white no-underline transition"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
