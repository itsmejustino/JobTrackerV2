import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const jobs = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.job.findMany();
  res.status(200).json(examples);
};

export default jobs;