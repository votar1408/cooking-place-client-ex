import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searching } from '../../redux/actions';
import compose from '../../utils';
import { navigation } from '../../consts';

import './tag-list.scss';

const TagList = memo(({ tags, searchingFunc, history }) => {
  // description of function
  const setSearchValue = e => {
    searchingFunc(e.target.innerHTML);
    history.push(navigation.recipes);
  };

  const elements = tags.map(({ id, text }) => {
    return (
      <button key={id} className="tag-list__item mr-3" onClick={setSearchValue} type="button">
        {text}
      </button>
    );
  });

  return (
    <div className="main-container">
      <div className="block-underline common-ico p-3">
        <img src="/images/ico/icons8-tags-48.png" alt="tags" />
        <div className="header-title-h2 ml-2">Теги для поиска</div>
      </div>
      <div className="tag-list p-3">{elements}</div>
    </div>
  );
});

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  searchingFunc: PropTypes.func,
  history: PropTypes.any
};

const mapDispatchToProps = {
  searchingFunc: searching
};

export default compose(withRouter, connect(null, mapDispatchToProps)(TagList))(TagList);
