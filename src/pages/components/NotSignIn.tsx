import React, { type FC } from "react";
import { api } from "../../utils/api";

const NoSignIn: FC = () => {
 
  const notSignedInQuery = api.notLoggedIn.NotSignedInMessage.useQuery();
 

  return <><div className="p-6 font-bold rounded-lg bg-slate-400">{notSignedInQuery.data}</div></>;
};

export default NoSignIn;