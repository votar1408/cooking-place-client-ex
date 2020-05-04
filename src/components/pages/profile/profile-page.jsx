import React, { useState, useContext, useMemo, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-apollo';
import { useHttp } from '../../hooks';
import { routes, getNameIngredientsQuery } from '../../../queries';

import AuthContext from '../../context';
import AccordionList from './accordion-list';
import { setUserInfoProfile, ingredientsLoadedAction, loadingAction } from '../../../redux/actions';
import { NewRecipeModal } from '../../modals';

import './profile-page.scss';

const ProfilePage = () => {
  const { userId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { loading, request } = useHttp();
  const { loading: loadIngredient, data: dataIngredient } = useQuery(getNameIngredientsQuery);

  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useMemo(async () => {
    const { email, firstName, secondName, personalRecipes = [] } = await request(
      routes.user,
      'POST',
      {
        userId
      }
    );
    setUserData({ fullName: `${firstName} ${secondName}`, email, personalRecipes });

    dispatch(setUserInfoProfile({ email, firstName, secondName, userId }));
  }, []);

  useEffect(() => {
    dispatch(loadingAction(loading || loadIngredient));
  }, [loading, loadIngredient]);

  if (!dataIngredient) {
    return null;
  }

  if (dataIngredient) {
    dispatch(ingredientsLoadedAction(dataIngredient.ingredients));
  }

  return (
    <div className="profile-page">
      <div className="half-container h-100">
        <div className="profile-page__column">
          <div className="title-text">Профиль</div>
          <div className="profile-page__user-info">
            <div className="user-info__image">
              <img src="/images/ico/users/icons8-female-profile-48.png" alt="user-logo" />
            </div>
            <ul className="user-info__description">
              <li className="user-info__text">{userData.fullName}</li>
              <li className="user-info__text">{userData.email}</li>
            </ul>
          </div>
          <AccordionList personalRecipes={userData.personalRecipes} />
          <div className="profile-page__buttons">
            <Button variant="success" type="submit" onClick={() => setModalShow(true)}>
              Создать рецепт
            </Button>
          </div>
        </div>
      </div>
      <NewRecipeModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ProfilePage;
