// eslint-disable-next-line no-undef
const client_id = process.env.STRAVA_CLIENT_ID;
// eslint-disable-next-line no-undef
const client_secret = process.env.STRAVA_CLIENT_SECRET;
// eslint-disable-next-line no-undef
const refresh_token_adrian = process.env.STRAVA_REFRESH_TOKEN_ADRIAN;
// eslint-disable-next-line no-undef
const refresh_token_joel = process.env.STRAVA_REFRESH_TOKEN_JOEL;
// eslint-disable-next-line no-undef
const refresh_token_asier = process.env.STRAVA_REFRESH_TOKEN_ASIER;
// eslint-disable-next-line no-undef
const refresh_token_hodei = process.env.STRAVA_REFRESH_TOKEN_HODEI;

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
  const athleteTokens = {
    adrian: refresh_token_adrian,
    joel: refresh_token_joel,
    asier: refresh_token_asier,
    hodei: refresh_token_hodei,
  };

  // Create an async function to process each athlete
  const processAthlete = async ([athleteName, token]) => {
    try {
      if (!token) {
        console.error(`No refresh token found for ${athleteName}`);
        return null; // Return null instead of continuing
      }

      // Get a new access token
      const tokenRes = await fetch(
        `https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${token}&grant_type=refresh_token`,
        { method: "POST" }
      );

      // Check if the response is ok and is JSON
      if (!tokenRes.ok) {
        console.error(
          `Token refresh failed for ${athleteName}:`,
          tokenRes.status,
          tokenRes.statusText
        );
        return null; // Return null instead of continuing
      }

      const tokenData = await tokenRes.json();
      const access_token = tokenData.access_token;

      if (!access_token) {
        console.error(`No access token received for ${athleteName}`);
        return null;
      }

      // Fetch your latest activities
      const activitiesRes = await fetch(
        //TODO: If you want to fetch more than 200 activities, you can use the page parameter to paginate through results
        "https://www.strava.com/api/v3/athlete/activities?per_page=200",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      if (!activitiesRes.ok) {
        console.error(
          `Activities fetch failed for ${athleteName}:`,
          activitiesRes.status,
          activitiesRes.statusText
        );
        return null;
      }

      const result = await activitiesRes.json();

      return {
        [athleteName]: {
          totalKm: getTotalKmSinceJune(result),
          totalTime: getTotalTimeSinceJune(result),
        },
      };
    } catch (error) {
      console.error(`Error processing ${athleteName}:`, error);
      return null; // Return null on error
    }
  };

  // Run all athlete processing in parallel
  const athletePromises = Object.entries(athleteTokens).map(processAthlete);
  const results = await Promise.all(athletePromises);

  // Filter out null results (failed requests)
  const activities = results.filter((result) => result !== null);

  res.status(200).json({
    activities,
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
