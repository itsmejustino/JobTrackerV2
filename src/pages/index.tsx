import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import JobList from "./components/Joblist";
import { signIn, signOut, useSession } from "next-auth/react";

//1. Capture input in State object. [DONE]
//2. Use object in State to Mutate to database. [DONE]
//3. query database for newly posted input. [DONE]
//4. Map db to create a list of input. [In Progress]

const Home: NextPage = () => {
  const router = useRouter();
  // Mutations and Queries for jobs to the DB
  const createJobMutation = api.jobs.addJob.useMutation();

  //loading component using isLoading attribute from from trpc
  // if(!jobsData || isLoading) return <p> loading...</p>
  const createJob = async (
    jobName: string,
    company: string,
    platform: string,
    appliedon: string,
    interview: string,
    followup: string,
  ): Promise<void> => {
    createJobMutation.mutate({
      jobName,
      company,
      platform,
      appliedon,
      interview,
      followup,
    });
  };

  const getInput = (e: React.FormEvent): void => {
    router.push("/");
    const target = e.target as typeof e.target & {
      jobName: { value: string };
      organization: { value: string };
      platform: { value: string };
      appliedOn: { value: string };
      interviewDate: { value: string };
      followUp: { value: string };
    };

    const jobText = target.jobName.value;
    const orgText = target.organization.value;
    const platformText = target.platform.value;
    const appliedOnDate = target.appliedOn.value;
    const interviewDate = target.appliedOn.value;
    const followUpBool = target.followUp.value;
    createJob(jobText, orgText, platformText, appliedOnDate, interviewDate, followUpBool).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Job Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row rounded-b-xl items-end gap-2 bg-slate-400 p-2">
        <AuthShowcase />
      </div>

      <main className="nav-w-3xl mx-auto my-12  bg-slate-300 p-12">
        <div className="flex justify-around gap-3 bg-slate-400 p-3">
          <h2 className="text-2xl font-semibold">Applications Tracker</h2>
          <div className="flex flex-row">
            <button
              type="button"
              className="flex flex-row items-center gap-2 rounded-md bg-blue-400 p-2 text-sm transition hover:bg-blue-500"
            >
              Save Applications List
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <form
          className="mt-20 flex flex-row flex-wrap items-end justify-center gap-4"
          onSubmit={getInput}
        >
          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Job Name
            </label>
            <input
              name="jobName"
              type="text"
              id="small-input"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>

          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Organization
            </label>
            <input
              name="organization"
              type="text"
              id="small-input"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>

          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Platform
            </label>
            <input
              name="platform"
              type="text"
              id="small-input"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>

          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Applied On-Date
            </label>
            <input
              name="appliedOn"
              type="date"
              id="small-input"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>

          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Interview Date
            </label>
            <input
              name="interviewDate"
              type="date"
              id="small-input"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>
          <div className="flex flex-col gap-0">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Follow Up
            </label>
            <input
              name="followUp"
              type="date"
              date-format="DD-MMMM-YYYY"
              id="default-checkbox"
              className="w-100 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>

          <button
            type="submit"
            className="flex flex-row items-center gap-2 rounded-md bg-blue-400 p-2 text-sm transition hover:bg-blue-500"
          >
            Add Job{" "}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </form>
      </main>

      {<JobList />}
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
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
        className="bg-slate-700 rounded-full px-10 py-3 font-semibold text-white no-underline transition hover:bg-slate/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
