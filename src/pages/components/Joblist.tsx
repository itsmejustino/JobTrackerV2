import React, { type FC } from 'react';
import { useReducer } from 'react';
import { api } from "../../utils/api";

// interface JobListProps {
//   id: string;
//   jobName: string;
//   company: string;
//   platform: string;
//   appliedon: string;
// }

const JobList: FC = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const deleteJobMutation = api.jobs.deleteJob.useMutation().mutateAsync;
  const queryJobList = api.jobs.getAllJobs.useQuery();

  const displayJobs =  queryJobList.data?.map(x => {
    return (
      <div onChange={forceUpdate} key={x.id} id={x.id} className="flex flex-row items-center gap-2 justify-center mb-2">
        <ul className="flex flex-row items-center gap-2">
          <li>Job: {x.jobName}</li>
          <li>Company: {x.company}</li>
          <li>Platform: {x.platform}</li>
          <li>Applied Date: {x.appliedon}</li>
        </ul>
        <button
        
          onClick={() => {
            // e.target.dispatchEvent
            
            const deleteKey:any= document.getElementById(`${x.id}`)?.id;
            deleteJobMutation({id: deleteKey});
            // forceUpdate;
          }}
          type='button'
          className="flex flex-row items-center gap-2 bg-blue-400 text-sm rounded-md transition p-2 hover:bg-blue-500"
          key={x.id}
        >
          Delete
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </button>
      </div>)

  })



  return (
    <ul>
      {displayJobs}
    </ul>
  );
};

export default JobList;