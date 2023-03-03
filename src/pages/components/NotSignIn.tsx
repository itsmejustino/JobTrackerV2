import React, { type FC } from "react";
import { api } from "../../utils/api";

const NoSignIn: FC = () => {
 
  const notSignedInQuery = api.notLoggedIn.NotSignedInMessage.useQuery();
 

  return <><div className="bg-slate-400">{notSignedInQuery.data}</div></>;
};

export default NoSignIn;