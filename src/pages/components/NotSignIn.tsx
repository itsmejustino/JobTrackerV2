import React, { type FC } from "react";
import { api } from "../../utils/api";

const NoSignIn: FC = () => {
 
  const notSignedInQuery = api.notLoggedIn.NotSignedInMessage.useQuery();
 

  return <>{notSignedInQuery.data}</>;
};

export default NoSignIn;