import type { NextApiRequest, NextApiResponse } from 'next';

const deploy = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { REPOSITORY_OWNER, REPOSITORY_NAME, GITHUB_TOKEN } = process.env;
  const dispatchUrl = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/dispatches`;

  const response = await fetch(dispatchUrl, {
    body: JSON.stringify({ event_type: 'redeploy' }),
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  console.log(response.status);

  res.send({ status: response.status });
};

export default deploy;
