import React, { type FC, useEffect } from "react";
import { api } from "../../utils/api";
import moment from "moment";
import { useSession } from "next-auth/react";

const JobList: FC = () => {
  const { data: sessionData } = useSession();
  const deleteJobMutation = api.jobs.deleteJob.useMutation().mutateAsync;
  const queryUserJobList = api.jobs.getAllUserJobs.useQuery();

  useEffect(() => {
    if (queryUserJobList.error) {
      console.error(queryUserJobList.error);
    }
  }, [queryUserJobList.error]);

  const deleteJob = (id: string): void => {
    deleteJobMutation({ id }).then(() => {
      // trigger a re-render of the component
      queryUserJobList.refetch();
    });
  };

  const userId = sessionData?.user?.id;
  if (!userId || !queryUserJobList.data || queryUserJobList.error || queryUserJobList.isLoading) return <div className="flex justify-center"> <p className="flex justify-center">Loading job list...</p> </div>;
  if (userId && queryUserJobList.isLoading) return <div className="flex justify-center"> <p className="flex justify-center">Loading job list...</p> </div>;

  const displayJobs = queryUserJobList.data
    ?.filter((job) => job.userId === userId)
    .map((x) => {
      return (
        <div
          key={x.userId}
          id={x.id}
          className=" shadow-lg-black m-auto mb-2 w-auto gap-2 rounded-2xl bg-slate-500"
        >
          <div className="m-4 flex flex-col p-2">
            <ul className="align-center flex flex-col flex-wrap gap-4 rounded-xl bg-slate-800 p-2 shadow-md">
              <li className="m-2 max-w-sm rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Job:</span> {x.jobName}
              </li>
              <li className=" m-2 max-w-sm rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Company:</span> {x.company}
              </li>
              <li className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Platform:</span> {x.platform}
              </li>
              <li className="m-2 max-w-sm  rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Applied Date:</span>{" "}
                {moment(x.appliedon).format("LL")}
              </li>
              <li className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Interview Date:</span>{" "}
                {moment(x.interview).format("LL")}
              </li>
              <li className="m-2 max-w-sm  rounded-xl bg-indigo-50 p-2">
                <span className="font-bold">Next Follow Up Date: </span>
                {moment(x.followup).format("LL")}
              </li>
            </ul>

            <button
              onClick={() => {
                deleteJob(x.id);
              }}
              type="button"
              className="m-4 flex flex-row justify-center gap-2 rounded-md bg-blue-400 p-2 text-sm shadow-md transition hover:bg-blue-500"
              key={x.id}
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    });

  return !userId ? (
    <div className="align-content-center flex flex-row justify-center">
      <p className="flex flex-row justify-center">
        {" "}
        Please login or signup to view your job list{" "}
      </p>
    </div>
  ) : (
    <>{displayJobs}</>
  );
};

export default JobList;
