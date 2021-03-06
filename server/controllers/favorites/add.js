const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const addFavoriteToCache = require('./utils/addFavoriteToCache');
const addToFavorites = require('./utils/addToFavorites');
const getCurrentTracks = require('./utils/getCurrentTracks');

const isEqualTo = curry((trackData, targetUser) => trackData.id === targetUser.id);

const isDuplicate = (targetUser, trackData) => targetUser.favorites.some(isEqualTo(trackData));

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  const { trackData, query } = req.body.data;

  const targetUser = await User.findById(userId);

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  addFavoriteToCache(targetUser, query, trackData);

  if (isDuplicate(targetUser, trackData)) {
    await targetUser.save();
    const errMsg = 'You have already favorited this track. You must really like it!';
    next(errMsg);
    return;
  }

  addToFavorites(targetUser, trackData);

  await targetUser.save();

  const { favorites, cache } = targetUser;

  const current = getCurrentTracks(cache, query.toLowerCase());

  res.send({
    success: true,
    // if current playlist is empty, return an empty object -- useful for testing
    current: current ? current.tracks : {},
    favorites,
    cache
  });
};
