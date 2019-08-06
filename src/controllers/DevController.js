const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({
      username
    });

    if (userExists) {
      return res.json(userExists);
    }

    let response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      username,
      bio,
      avatar
    });

    return res.json(dev);
  }
};
