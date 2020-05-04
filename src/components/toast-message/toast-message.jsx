import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { removeToastAction } from '../../redux/actions';

import './toast-message.scss';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const toastsData = useSelector(({ otherData: { toasts } }) => toasts);

  const onHideHandler = time => {
    dispatch(removeToastAction({ time }));
  };

  const elements = toastsData.map(({ message, time, type }) => {
    const difference = Date.now() - time;

    const { seconds, minutes } = conversationTime(difference);

    let totalTime = '1 сек назад';
    if (minutes || seconds) {
      totalTime = minutes > 0 ? `${minutes}мин ` : '';
      totalTime += seconds > 0 ? `${seconds}сек назад` : '';
    }

    const className = type ? `toast-header-${type}` : 'toast-header';

    return (
      <Toast key={time} onClose={() => onHideHandler(time)} show delay={3000} autohide>
        <Toast.Header className={className}>
          <strong className="mr-auto">Сообщение</strong>
          <small>{totalTime}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  });

  return (
    <div className="toast-modal">
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        <div className="toast-column b-r">{elements}</div>
      </div>
    </div>
  );
};

export default ToastMessage;
