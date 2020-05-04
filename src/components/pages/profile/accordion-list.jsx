import React from 'react';
import PropTypes from 'prop-types';

import { Accordion } from 'react-bootstrap';

import './profile-page.scss';
import AccordionItem from './accordion-item';

const AccordionList = ({ personalRecipes }) => {
  return (
    <div className="accordion-list">
      <Accordion>
        <AccordionItem
          name="Мои рецепты"
          list={personalRecipes}
          warning="Вы еще не добавляли рецепты!"
          evKey="0"
        />
        <AccordionItem
          name="Избранные рецепты"
          list={personalRecipes}
          warning="Вы еще не добавляли избранные рецепты!"
          evKey="1"
        />
      </Accordion>
    </div>
  );
};

AccordionList.propTypes = {
  personalRecipes: PropTypes.array
};

export default AccordionList;
