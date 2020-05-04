import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import compose from '../../utils';
import { searching } from '../../redux/actions';
import { navigation } from '../../consts';

import './search-panel.scss';

const SearchPanel = ({ history, searchingFunc, searchValue }) => {
  const [inputValue, onChangeInput] = useState('');

  // description of function
  const updateSearchValue = () => {
    // searchingFunc(inputValue);
    // history.push(navigation.recipes);
  };

  useEffect(() => {
    onChangeInput(searchValue);
    updateSearchValue();
  }, [searchValue]);

  // const setSearchValue = e => {
  //   if (e.key === 'Enter') {
  //     updateSearchValue();
  //   }
  // };

  const updateInputValue = e => {
    onChangeInput(e.target.value);
    searchingFunc(e.target.value);
  };

  const clearSearchValue = () => {
    onChangeInput('');
    searchingFunc('');
  };

  const postfix = inputValue.length > 0 ? '-visible' : '';

  return (
    <div className="search-panel">
      <button type="button" className="search-panel__button-search" onClick={updateSearchValue}>
        <div className="search-panel__image">
          <img src="/images/ico/search.svg" alt="search-button" />
        </div>
      </button>
      <input
        type="text"
        className="search-panel__input"
        placeholder="Введите текст для поиска"
        onChange={updateInputValue}
        // onKeyPress={setSearchValue}
        value={inputValue}
      />
      <button
        type="button"
        className={`search-panel__button-delete${postfix}`}
        onClick={clearSearchValue}
      >
        <div className="search-panel__image">
          <img src="/images/ico/x.svg" alt="search-button" />
        </div>
      </button>
    </div>
  );
};

SearchPanel.propTypes = {
  searchingFunc: PropTypes.func,
  history: PropTypes.any,
  searchValue: PropTypes.string.isRequired
};

const mapStateToProps = ({ otherData: { searchValue } }) => {
  return { searchValue };
};

const mapDispatchToProps = {
  searchingFunc: searching
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
)(SearchPanel);
