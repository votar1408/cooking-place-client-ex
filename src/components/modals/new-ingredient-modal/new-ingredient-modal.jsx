/* eslint-disable no-underscore-dangle */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { useMutation } from 'react-apollo';

import IngredientForm from './ingredient-form';
import { addIngredientMutation } from '../../../queries';

import { addToastAction, addIngredientAction } from '../../../redux/actions';

import './new-ingredient-modal.scss';

const NewIngredientModal = memo(({ show, onHide }) => {
  const dispatch = useDispatch();
  const [addIngredient, { data: dataQuery }] = useMutation(addIngredientMutation);
  const userId = useSelector(({ userProfile }) => {
    return userProfile.info.userId;
  });

  useEffect(() => {
    if (dataQuery) {
      const { msg } = dataQuery.addIngredient;
      dispatch(addToastAction(msg));
      dispatch(addIngredientAction(dataQuery.addIngredient));
    }
  }, [dataQuery]);

  const onCreateIngredient = data => {
    addIngredient({ variables: { ...data, createdBy: userId } });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="window-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="title-text-modal" id="contained-modal-title-vcenter">
          Создать новый ингредиент
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IngredientForm
          onHide={onHide}
          onCreateIngredient={data => {
            onCreateIngredient(data);
          }}
        />
      </Modal.Body>
    </Modal>
  );
});

NewIngredientModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default NewIngredientModal;
