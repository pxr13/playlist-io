import React from 'react';

import {
  TopTracksWrapper,
  TopTrackWrapper,
  AlbumArt,
  TopTrackArtistName,
  TopTrackName
} from './styles';

const renderTopTrack = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <TopTrackWrapper onClick={() => playTrack(idx)} key={`${name}-${idx}`}>
    <AlbumArt src={images[0].url} />
    <TopTrackName>{name.length < 22 ? name : name.slice(0, 22) + '...'}</TopTrackName>
    <TopTrackArtistName>{artists[0].name}</TopTrackArtistName>
  </TopTrackWrapper>
);

const TopTracks = ({ topTracks, playTrack }) => (
  <TopTracksWrapper>{topTracks.map(renderTopTrack(playTrack))}</TopTracksWrapper>
);

export default TopTracks;
