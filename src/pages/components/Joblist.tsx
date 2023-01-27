import React, { type FC, useEffect, useState } from "react";
import { api } from "../../utils/api";
import moment from "moment";
import { useSession } from "next-auth/react";
interface FormData {
  jobName: string;
  company: string;
  platform: string;
  appliedon: string;
  interview: string;
  followup: string;
}

const JobList: FC = () => {
  const { data: sessionData } = useSession();
  const deleteJobMutation = api.jobs.deleteJob.useMutation().mutateAsync;
  const queryUserJobList = api.jobs.getAllUserJobs.useQuery();
  const editJobMutation = api.jobs.editJob.useMutation().mutateAsync;
  const userId = sessionData?.user?.id;

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleJobList = () =>{
     setIsVisible(!isVisible);
  }
  
  const handleEditClick = (jobId:string) => {
    setSelectedJobId(jobId);
  };
  const [formData, setFormData] = useState<FormData>({
    jobName: "",
    company: "",
    platform: "",
    appliedon: "",
    interview: "",
    followup: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const editJob = async (
    id: string,
    userId: string,
    jobName: string,
    company: string,
    platform: string,
    appliedon: string,
    interview: string,
    followup: string
  ): Promise<void> => {
    editJobMutation({
      id,
      userId,
      jobName,
      company,
      platform,
      appliedon,
      interview,
      followup,
    }).then(() => { 
      handleVisibleJobList();
      queryUserJobList.refetch();
      
    });
  };

  if (
    !userId ||
    !queryUserJobList.data ||
    queryUserJobList.error ||
    queryUserJobList.isLoading
  )
    return (
      <div className="flex justify-center rounded-md bg-slate-700 p-3">
        {" "}
        <p className="flex justify-center font-semibold text-white">
          <svg
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
            xmlSpace="preserve"
          >
            <rect
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              x="25"
              y="25"
              width="50"
              height="50"
            >
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                from="0 50 50"
                to="180 50 50"
                type="rotate"
                id="strokeBox"
                attributeType="XML"
                begin="rectBox.end"
              />
            </rect>
            <rect x="27" y="27" fill="#fff" width="46" height="50">
              <animate
                attributeName="height"
                dur="1.3s"
                attributeType="XML"
                from="50"
                to="0"
                id="rectBox"
                fill="freeze"
                begin="0s;strokeBox.end"
              />
            </rect>
          </svg>
          Loading job list...
        </p>{" "}
      </div>
    );

  const displayJobs = queryUserJobList.data?.filter((job) => job.userId === userId)
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
               onClick={() => {handleEditClick(x.id);
                  handleVisibleJobList();}}
              type="button"
              className="m-4 flex flex-row justify-center gap-2 rounded-md bg-blue-400 p-2 text-sm shadow-md transition hover:bg-blue-500"
              key={x.id}
            >
              Edit
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
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </button>

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
            {isVisible && selectedJobId === x.id && (
              <form className="m-4 flex flex-col p-2" >
                <span className="font-bold">Job: </span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="text"
                  name="jobName"
                  value={formData.jobName}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <span className="font-bold">Company: </span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <span className="font-bold">Platform: </span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <span className="font-bold">Applied Date: </span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="date"
                  name="appliedon"
                  value={formData.appliedon}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <span className="font-bold">Interview Date:</span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="date"
                  name="interview"
                  value={formData.interview}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <span className="font-bold">Follow Up Date:</span>{" "}
                <input
                  className=" m-2 max-w-sm  rounded-xl bg-indigo-50 p-2"
                  type="date"
                  name="followup"
                  value={formData.followup}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <button
                  onClick={() => {
                    editJob(
                      x.id,
                      userId,
                      formData.jobName,
                      formData.company,
                      formData.platform,
                      formData.appliedon,
                      formData.interview,
                      formData.followup
                    );
                  }}
                  type="button"
                  className="m-4 flex flex-row justify-center gap-2 rounded-md bg-blue-400 p-2 text-sm shadow-md transition hover:bg-blue-500"
                  key={x.id}
                >
                  Save
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      );
    });

  return <>{displayJobs}</>;
};

export default JobList;