import React, { Component } from 'react';
import { Field } from 'redux-form';
import { isEmpty } from 'ramda';

import * as Style from './SearchStyles';
import media from '../../utils/mediaTemplate';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (isLoaded) => (isLoaded ? '' : 'wrapper__hide');

class Search extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { savedPlaylists, spotifyId, fetchSavedPlaylists } = this.props;

    if (isEmpty(savedPlaylists)) fetchSavedPlaylists(spotifyId);
  }

  handleFormSubmit = ({ query }) => {
    const { fetchPlaylist, accessToken, history, setPath } = this.props;
    const newPath = '/playing';

    fetchPlaylist(accessToken, query);
    setPath(history, newPath);
  };

  handleLoadedImg = () => {
    this.setState({ isLoaded: true });
  };

  renderSearchField = ({ input }) => (
    <Style.Form {...input}>
      <Style.SearchIcon />
      <Style.Input autoFocus placeholder={'Ex: "programming", "workout", etc.'} />
      <Style.Btn type="submit">
        <Style.BtnText>Search</Style.BtnText>
      </Style.Btn>
    </Style.Form>
  );

  render() {
    const { handleSubmit } = this.props;
    const { isLoaded } = this.state;

    return (
      <div>
        <Style.Wrapper className={getClassName(isLoaded)}>
          <BackgroundImg
            onLoad={this.handleLoadedImg}
            src="https://source.unsplash.com/wejxKZ-9IZg/1500x800"
          />
          <Style.InnerWrapper>
            <Style.Title>
              Enter a keyword and our robots will search Spotify playlists for popular songs related
              to that word.
            </Style.Title>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="query"
                type="text"
                component={this.renderSearchField}
                placeholder="Enter a keyword..."
              />
            </form>
          </Style.InnerWrapper>
        </Style.Wrapper>
        {!isLoaded && (
          <HomePlaceholderWrapper>
            <HomeBackgroundPlaceholder />
          </HomePlaceholderWrapper>
        )}
      </div>
    );
  }
}

export default Search;
