// eslint-disable-next-line no-undef
const client_id = process.env.STRAVA_CLIENT_ID;
// eslint-disable-next-line no-undef
const client_secret = process.env.STRAVA_CLIENT_SECRET;
// eslint-disable-next-line no-undef
const refresh_token_adrian = process.env.STRAVA_REFRESH_TOKEN_ADRIAN;

// This is a Vercel serverless function that fetches data from the Strava API. Vercel reads the default export function and runs it as a serverless function.
export default async function handler(req, res) {
  /* INSTRUCTIONS TO ALLOW STRAVA TO ACCESS USER DATA
  const redirect_uri = process.env.STRAVA_REDIRECT_URI;
  // Every user we want to gather data for should visit this URL to authorize the app and then send us the CODE from the generated URL
  const auth = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&approval_prompt=force&scope=activity:read_all`;
  //Afterwards we can use the code to get the refresh token for that user by running a curl request with the correct code
  curl -X POST https://www.strava.com/api/v3/oauth/token -d client_id=167611 -d client_secret=9b1e9971a91ede4d0e5f5e3808bd9c783162d1f5 -d code=8c04f3d3ff90443eaec4aa1d9bbc57e690e8c56e -d grant_type=authorization_code
  // Retrieve the refresh token from the response and add it to your environment variables for that specific user
  */

  // Get a new access token
  const tokenRes = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token_adrian}&grant_type=refresh_token`,
    { method: "POST" }
  );

  const tokenData = await tokenRes.json();
  const access_token = tokenData.access_token;

  // Fetch your latest activities
  const activitiesRes = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=5",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  const activities = await activitiesRes.json();

  res.status(200).json({
    totalKm: getTotalKmSinceJune(activities),
    totalTime: getTotalTimeSinceJune(activities),
  });
}

const getTotalKmSinceJune = (activities) => {
  const runsSinceJune = getActivitiesSinceJune(activities);

  const totalKm = runsSinceJune.reduce(
    (sum, act) => sum + act.distance / 1000,
    0
  );

  const totalKmRounded = Math.round(totalKm * 100) / 100;

  return totalKmRounded;
};

const getTotalTimeSinceJune = (activities) => {
  const runsSinceJune = getActivitiesSinceJune(activities);

  const totalSeconds = runsSinceJune.reduce(
    (sum, act) => sum + act.moving_time,
    0
  );

  // Convert seconds to hours, minutes, seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  return {
    time: `${hours}h ${minutes}m`,
  };
};

const getActivitiesSinceJune = (activities) => {
  const now = new Date();
  const year = now.getFullYear();
  const juneFirst = new Date(`${year}-06-01T00:00:00Z`);

  const runsSinceJune = activities.filter(
    (act) => act.type === "Run" && new Date(act.start_date) >= juneFirst
  );

  return runsSinceJune;
};
