/* Module for handling specific requests/routes for stock data */
const provider = require("./data-provider.js");
const artists = provider.data;
// return all the stocks when a root request arrives
const handleAllArtists = (app) => {
  // return all the stocks when a root request arrives
  app.get("/api/artists", (req, resp) => {
    resp.json(artists);
  });
};
// return just the requested artist
const handleSingleArtist = (app) => {
  app.get("/api/artists/:ArtistID", (req, resp) => {
    const artistToFind = req.params.ArtistID;
    // search the array of objects for a match
    const matches = artists.filter((obj) => artistToFind === obj.ArtistID);
    // return the matching stock
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`ID ${artistToFind} not found`));
    }
  });
};

// return just the requested artist nationality
const handleSingleArtistNationality = (app) => {
  app.get("/api/artists/nationality/:value", (req, resp) => {
    const value = req.params.value.toLowerCase();
    // search the array of objects for a match
    const matches = artists.filter((obj) =>
      obj.Nationality.toLowerCase().includes(value)
    );
    // return the matching stock
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`ID ${value} not found`));
    }
  });
};

// return all the artists whose name contains the supplied text
const handleNameSearch = (app) => {
  app.get("/api/artists/name/:name", (req, resp) => {
    // change user supplied substring to lower case
    const name = req.params.name.toLowerCase();
    // search the array of objects for a match
    const matches = artists.filter((obj) =>
      obj.LastName.toLowerCase().includes(name)
    );
    // return the matching stocks
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.json(jsonMessage(`No symbol matches found for ${name}`));
    }
  });
};

// error messages need to be returned in JSON format
const jsonMessage = (msg) => {
  return { message: msg };
};
module.exports = {
  handleAllArtists,
  handleSingleArtist,
  handleSingleArtistNationality,
  handleNameSearch,
};
