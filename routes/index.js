const APITools = require("../bungieAPIRequests/APITools");

module.exports = (server) => {
  server.get("/test", (req, res) => {
    console.log("oi");
    res.end();
  });
  server.post("/profile", async (req, res) => {
    try {
      const { name, membershipType } = req.body;
      //console.log(name, membershipType);
      const membershipIdFromAPI = await APITools.searchForMembership(
        membershipType,
        name
      );
      //console.log(membershipIdFromAPI);
      const charactersFromAPI = await APITools.searchForProfile(
        membershipType,
        membershipIdFromAPI.membershipId
      );
      //console.log(charactersFromAPI);
      const characterInfo = await Promise.all(
        charactersFromAPI.map(async (characterId) => {
          const characterInfoFromAPI = await APITools.searchForCharacterId(
            membershipType,
            membershipIdFromAPI.membershipId,
            characterId
          );
          return {
            characterId,
            light: characterInfoFromAPI.light,
            class: characterInfoFromAPI.class,
            emblemPath: characterInfoFromAPI.emblemPath,
            emblemBackgroundPath: characterInfoFromAPI.emblemBackgroundPath,
          };
        })
      );
      res.json({
        name,
        membershipType,
        membershipId: membershipIdFromAPI.membershipId,
        characterInfo,
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
  server.post("/profile/character", async (req, res) => {
    try {
      const { membershipType, membershipId, characterId, mode } = req.body;
      const activityListFromAPI = await APITools.searchForActivities(
        membershipType,
        membershipId,
        characterId,
        mode
      );
      console.log(activityListFromAPI.length);
      res.json(activityListFromAPI);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
};

//25 last activities
//titan: 0
//warlock: 2
//hunter: 1
//Xbox: 1
//PS4: 2
//PC: 3
