/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Link from 'next/link';
import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
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
    const eventInfoQuery = queryUserJobList.data
    ?.filter((job) => job.userId === userId)
    .map((x) =>{
        x.appliedon, x.jobName })


    function renderEventContent(eventInfo : any) {
       eventInfo.data = eventInfoQuery
        return (
          <>
            <b>{eventInfo.data.appliedon}</b>
            <i>{eventInfo.data.jobName}</i>
          </>
        )
      }

 return(<>
 <div className="flex flex-row justify-end mb-2">
 <AuthShowcase/>
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
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </Link>
    </div>
  </div>

 
 
 <FullCalendar
 plugins={[ dayGridPlugin ]}
 initialView="dayGridMonth"
 eventContent={renderEventContent}
/>
</>)
};
export default Calendar;

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myImage: any = sessionData && sessionData.user?.image;
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
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