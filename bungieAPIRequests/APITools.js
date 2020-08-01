const requestPromise = require("request-promise");
const key = process.env.BUNGIE_KEY;

const returnRequestOptions = (uriParams) => {
  return {
    method: "GET",
    uri: "https://www.bungie.net/Platform/Destiny2/" + uriParams,
    headers: {
      "X-API-KEY": key,
    },
    json: true,
  };
};

const classToString = (classId) => {
  if (classId == 0) return "Titan";
  else if (classId == 1) return "Hunter";
  else if (classId == 2) return "Warlock";
};

module.exports = {
  searchForMembership: (membershipType, name) => {
    return new Promise((resolve, reject) => {
      requestPromise(
        returnRequestOptions(`SearchDestinyPlayer/${membershipType}/${name}/`)
      ).then((APIResponse) => {
        if (!APIResponse.Response[0]) reject({ Error: "No such user" });
        else resolve({ membershipId: APIResponse.Response[0].membershipId });
      });
    });
  },
  searchForProfile: (membershipType, membershipId) => {
    return new Promise((resolve, reject) => {
      requestPromise(
        returnRequestOptions(
          `${membershipType}/Profile/${membershipId}/?components=100`
        )
      ).then((APIResponse) => {
        if (!APIResponse.Response.profile) reject({ Error: "No profile" });
        else resolve([...APIResponse.Response.profile.data.characterIds]);
      });
    });
  },
  searchForCharacterId: (membershipType, membershipId, characterId) => {
    return new Promise((resolve, reject) => {
      requestPromise(
        returnRequestOptions(
          `${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=200`
        )
      ).then((APIResponse) => {
        if (!APIResponse.Response.character) reject({ Error: "No character" });
        else
          resolve({
            class: classToString(APIResponse.Response.character.data.classType),
            light: APIResponse.Response.character.data.light,
            emblemPath: APIResponse.Response.character.data.emblemPath,
            emblemBackgroundPath:
              APIResponse.Response.character.data.emblemBackgroundPath,
          });
      });
    });
  },
  searchForActivities: (membershipType, membershipId, characterId, mode) => {
    return new Promise((resolve, reject) => {
      requestPromise(
        returnRequestOptions(
          `${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?mode=${mode}`
        )
      ).then((APIResponse) => {
        if (!APIResponse.Response.activities[0])
          reject({ Error: "No match data" });
        else
          resolve(
            APIResponse.Response.activities.map((activity) => activity.values)
          );
      });
    });
  },
};
