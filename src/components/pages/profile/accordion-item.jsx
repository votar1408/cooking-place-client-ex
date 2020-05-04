import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion } from 'react-bootstrap';

import './profile-page.scss';

const AccordionItem = ({ name, list, warning, evKey }) => {
  const [isOpen, setOpen] = useState(false);
  const onClickHandler = () => {
    setOpen(!isOpen);
  };

  const postfix = isOpen ? '-closed' : '';

  let elements = [];
  if (list && list.length > 0) {
    elements = list.map(el => {
      return <li key={el}>{el}</li>;
    });
  }

  return (
    <div className="accordion-item">
      <Accordion.Toggle
        className="accordion-item__header"
        eventKey={evKey}
        onClick={onClickHandler}
      >
        <div className="accordion-item__title">{name}</div>
        <div className={`accordion-item__toggler${postfix}`}>
          <img src="/images/ico/triangle.svg" alt="toggler" />
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={evKey}>
        <ul className="accordion-item__value">
          {elements.length > 0 ? elements : <li>{warning}</li>}
        </ul>
      </Accordion.Collapse>
    </div>
  );
};

AccordionItem.propTypes = {
  name: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired,
  evKey: PropTypes.string.isRequired,
  list: PropTypes.array
};

export default AccordionItem;
