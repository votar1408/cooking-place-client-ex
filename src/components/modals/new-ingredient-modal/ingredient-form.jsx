import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Modal } from 'react-bootstrap';

import './new-ingredient-modal.scss';

const IngredientForm = ({ onHide, onCreateIngredient }) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    name: '',
    totalCalories: '',
    proteins: '',
    carbohydrates: '',
    fats: ''
  });

  const onChangeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onHandleSubmit = event => {
    event.preventDefault();

    const formDiv = event.currentTarget;
    if (formDiv.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    onCreateIngredient(form);
    onHide();
  };

  return (
    <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
      <Form.Group className="border-around" controlId="ingredientForm.nameInput">
        <div className="common-ico mb-1">
          <img src="/images/ico/icons8-restaurant-menu-48.png" alt="icon" />
          <div className="header-title-h2 ml-2">Название игредиента</div>
        </div>
        <Form.Control
          name="name"
          size="lg"
          required
          type="text"
          placeholder="Введите название ингредиента"
          onChange={onChangeHandler}
        />
        <Form.Text className="text-muted">Обязательное поле для заполнения</Form.Text>
        <Form.Control.Feedback type="invalid">Поле не должно быть пустым!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="border-around" controlId="ingredientForm.totalCaloriesInput">
        <div className="common-ico ml-1">
          <img src="/images/ico/icons8-calories-48.png" alt="ingredients" />
          <div className="header-title-h2 ml-2">Общая калорийность на 100г</div>
        </div>
        <Form.Control
          name="totalCalories"
          size="lg"
          required
          type="text"
          pattern="[0-9.]+"
          placeholder="Укажите общую калорийность на 100г"
          onChange={onChangeHandler}
        />
        <Form.Text className="text-muted">Обязательное поле для заполнения</Form.Text>
        <Form.Control.Feedback type="invalid">
          Поле должно содержать цифровые выражения!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="border-around" controlId="ingredientForm.proteinInput">
        <div className="common-ico ml-1">
          <img src="/images/ico/icons8-protein-48.png" alt="ingredients" />
          <div className="header-title-h2 ml-2">Белки</div>
        </div>
        <Form.Control
          name="proteins"
          size="lg"
          required
          pattern="[0-9.]+"
          type="text"
          placeholder="Укажите кол-во белков в граммах"
          onChange={onChangeHandler}
        />
        <Form.Text className="text-muted">Обязательное поле для заполнения</Form.Text>
        <Form.Control.Feedback type="invalid">
          Поле должно содержать цифровые выражения!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="border-around" controlId="ingredientForm.carbohydratesInput">
        <div className="common-ico ml-1">
          <img src="/images/ico/icons8-carbohydrates-48.png" alt="ingredients" />
          <div className="header-title-h2 ml-2">Углеводы</div>
        </div>
        <Form.Control
          name="carbohydrates"
          size="lg"
          required
          pattern="[0-9.]+"
          type="text"
          placeholder="Укажите кол-во углеводов в граммах"
          onChange={onChangeHandler}
        />
        <Form.Text className="text-muted">Обязательное поле для заполнения</Form.Text>
        <Form.Control.Feedback type="invalid">
          Поле должно содержать цифровые выражения!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="border-around" controlId="ingredientForm.fatsInput">
        <div className="common-ico ml-1">
          <img src="/images/ico/icons8-lipids-48.png" alt="ingredients" />
          <div className="header-title-h2 ml-2">Жиры</div>
        </div>
        <Form.Control
          name="fats"
          size="lg"
          required
          pattern="[0-9.]+"
          type="text"
          placeholder="Укажите кол-во жиров в граммах"
          onChange={onChangeHandler}
        />
        <Form.Text className="text-muted">Обязательное поле для заполнения</Form.Text>
        <Form.Control.Feedback type="invalid">
          Поле должно содержать цифровые выражения!
        </Form.Control.Feedback>
      </Form.Group>
      <Modal.Footer className="mt-4">
        <Button variant="success" type="submit">
          Создать
        </Button>
        <Button variant="primary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Form>
  );
};

IngredientForm.propTypes = {
  onHide: PropTypes.func.isRequired,
  onCreateIngredient: PropTypes.func.isRequired
};

export default IngredientForm;
