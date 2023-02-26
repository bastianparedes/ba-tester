const { REPOSITORY_OWNER, REPOSITORY_NAME, GITHUB_TOKEN } = process.env;
const dispatchUrl = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/dispatches`;

const deploy = async (): Promise<any> => {
  await fetch(dispatchUrl, {
    body: JSON.stringify({ event_type: 'redeploy' }),
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
};

export { deploy };
