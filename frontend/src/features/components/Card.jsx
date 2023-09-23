import React, {useMemo} from 'react';
import CardLogo from '../../assets/CardLogo.svg';
import Styles from '../styles/CardForm.module.css';

const Card = props => {
  const getStyle = () => {
    if (props.colorChange === 'green') return Styles.colorChange;
    else if (props.colorChange === 'red') return Styles.colorChangeRed;
    return Styles.cardValidator;
  };

  const cardType = useMemo (
    () => {
      return props.isAmericaExpressCard ? 'American Express Card' : 'Card Validator';
    },
    [props.isAmericaExpressCard]
  );

  const fullName = useMemo (
    () => (props.formData.fullName === '' ? 'PRECIOUS ONYEUKWU' : props.formData.fullName),
    [props.formData.fullName]
  );

  const cardNumber = useMemo (
    () => {
      let formattedCardNumber = props.formData.cardNumber || '0000 0000 0000 0000';
      formattedCardNumber = formattedCardNumber.replace (/ /g, '');

      if (formattedCardNumber.length === 16) {
        formattedCardNumber = formattedCardNumber.replace (/(\d{4})/g, '$1 ');
      } else if (formattedCardNumber.length === 17) {
        formattedCardNumber = formattedCardNumber.replace (
          /(\d{5})(\d{4})(\d{3})(\d{5})/,
          '$1 $2 $3 $4'
        );
      } else if (formattedCardNumber.length === 18) {
        formattedCardNumber = formattedCardNumber.replace (
          /(\d{5})(\d{4})(\d{4})(\d{5})/,
          '$1 $2 $3 $4'
        );
      } else if (formattedCardNumber.length === 19) {
        formattedCardNumber = formattedCardNumber.replace (
          /(\d{5})(\d{5})(\d{4})(\d{5})/,
          '$1 $2 $3 $4'
        );
      }

      return formattedCardNumber;
    },
    [props.formData.cardNumber]
  );

  const expiryDate = useMemo (
    () => {
      const month = props.formData.expiresMonth === '' ? '12' : props.formData.expiresMonth;
      const year = props.formData.expiresYear === '' ? '23' : props.formData.expiresYear;
      return `${month}/${year}`;
    },
    [props.formData.expiresMonth, props.formData.expiresYear]
  );

  const cvv = useMemo (
    () => {
      if (props.formData.cvv === '') {
        return props.isAmericaExpressCard ? '2277' : '277';
      }
      return props.formData.cvv;
    },
    [props.formData.cvv, props.isAmericaExpressCard]
  );

  return (
    <div
      className={`${getStyle ()}`}
      style={{
        backgroundColor: props.colorChange === 'green'
          ? 'green'
          : props.colorChange === 'red' ? 'red' : 'black',
      }}
    >
      <div className={Styles.cardPtag}>
        <p>{cardType}</p>
        <img src={CardLogo} alt="Card Validator" />
      </div>
      <div className={Styles.cardFullNamePtag}>
        <p>{fullName}</p>
      </div>
      <div className={Styles.cardInput}>
        <p>
          {cardNumber}
        </p>
      </div>
      <div className={Styles.cardCvvContain}>
        <div className={Styles.cardExpiryDate}>
          <p>Expiry</p>
          <p>
            {expiryDate}
          </p>
        </div>
        <div className={Styles.cardCvv}>
          <p>CVV</p>
          <p><span>{cvv}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
