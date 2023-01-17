import React, { type FC, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

const NoSignIn: FC = () => {
 
  const notSignedInQuery = api.notLoggedIn.NotSignedInMessage.useQuery();
 

  return <>{notSignedInQuery.data}</>;
};

export default NoSignIn;