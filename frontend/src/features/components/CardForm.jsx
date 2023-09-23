import React, {useCallback, useMemo, useRef, useState} from 'react';
import Styles from '../styles/CardForm.module.css';
import CheckerModal from '../reusables/CheckerModal';
import axios from 'axios';
import {validateUrl} from '../../api/Api';
import GreenChecker from '../../assets/Checker.svg';
import RedChecker from '../../assets/RedChecker.svg';
import Card from './Card';

const CardForm = () => {
  const [formData, setFormData] = useState ({
    cardNumber: '',
    expiresMonth: '',
    expiresYear: '',
    fullName: '',
    cvv: '',
  });

  const [isOpen, setIsOpen] = useState (false);
  const [isRed, setIsRed] = useState (false);
  const [isAmericaExpressCard, setIsAmericaExpressCard] = useState (false);
  const [colorChange, setColorChange] = useState (null);
  const [isFormValid, setIsFormValid] = useState (false);
  const [errorMessage, setErrorMessage] = useState([]);

  const inputRefs = {
    expiresMonth: useRef (null),
    expiresYear: useRef (null),
    cvv: useRef (null),
  };

  const [isLoading, setIsLoading] = useState (false);

  const handleInputChange = (e, inputName) => {
    const {name, value} = e.target;
    setFormData ({
      ...formData,
      [name]: value,
    });

    checkFormValidity ();

    if (
      inputName !== 'cvv' &&
      inputName === 'expiresMonth' &&
      value.length === 2
    ) {
      const nextInputName = getNextInputName (inputName);
      if (nextInputName) {
        inputRefs[nextInputName].current.focus ();
      }
    }

    if (
      inputName !== 'cvv' &&
      inputName === 'expiresYear' &&
      value.length === 2
    ) {
      const nextInputName = getNextInputName (inputName);
      if (nextInputName) {
        inputRefs[nextInputName].current.focus ();
      }
    }
  };

  const getNextInputName = currentInputName => {
    const inputNames = Object.keys (inputRefs);
    const currentIndex = inputNames.indexOf (currentInputName);

    if (currentIndex === -1 || currentIndex === inputNames.length - 1) {
      return null;
    }
    return inputNames[currentIndex + 1];
  };

  const handleSubmit = async e => {
    e.preventDefault ();
    setIsLoading (true);
    try {
      const formattedDate = `${formData.expiresMonth}/${formData.expiresYear.slice (-2)}`;
      const data = {
        cardNumber: formData.cardNumber,
        cardCVV: formData.cvv,
        cardExpiryDate: formattedDate,
      };
      const response = await axios.post (validateUrl, data);
      console.log("response --> ", response.data)
      if (response.data.validationStatus === "success") {
        setIsOpen (!isOpen);
        setColorChange ('green');
      }else if (response.data.validationStatus === "failed"){
        setColorChange ('red');
        setIsRed (!isRed);
        setErrorMessage(response.data.validationErrors)
        showError();
      }
    } catch (error) {
      console.error ('Error:', error);
    } finally {
      setIsLoading (false);
    }
  };

 
const showError = useCallback(() => {
  for (let value of errorMessage) {
    alert(value)
  }
}, [errorMessage]);

  const isAmericanExpress = useMemo (
    () => {
      const cardPrefix = formData.cardNumber.slice (0, 2);
      return cardPrefix === '37' || cardPrefix === '34';
    },
    [formData.cardNumber]
  );

  useMemo (
    () => {
      setIsAmericaExpressCard (isAmericanExpress);
    },
    [isAmericanExpress]
  );

  const checkFormValidity = () => {
    const {cardNumber, expiresMonth, expiresYear, fullName, cvv} = formData;

    const isValid =
      cardNumber.trim () !== '' &&
      expiresMonth.trim () !== '' &&
      expiresYear.trim () !== '' &&
      fullName.trim () !== '' &&
      cvv.trim () !== '';

    setIsFormValid (isValid);
  };

  return (
    <div className={`${Styles.container} ${isOpen && Styles.centerContainer}`}>
      <Card
        formData={formData}
        isAmericaExpressCard={isAmericaExpressCard}
        colorChange={colorChange}
      />
      {!isOpen &&
        <form
          className={`${Styles.form} ${isOpen && Styles.disableForm}`}
          onSubmit={handleSubmit}
        >
          <div className={Styles.fullNameContain}>
            <p>Card Holder</p>
            <input
              required
              type="text"
              id={Styles.fullName}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className={Styles.inputField}>
            <p>Card Number</p>
            <div className={Styles.inputFields}>
              <div className={Styles.cardNumberOne}>
                <input
                  required
                  maxLength={19}
                  minLength={16}
                  type="text"
                  id={Styles.cardNumber}
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={e => handleInputChange (e, 'cardNumber')}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
            </div>
          </div>
          <div className={Styles.rightDiv}>
            <div className={Styles.expiryDate}>
              <p>Exp. Date</p>
              <div className={Styles.expireForm}>
                <input
                  required
                  maxLength={2}
                  type="text"
                  id={Styles.expiresMonth}
                  name="expiresMonth"
                  value={formData.expiresMonth}
                  onChange={e => handleInputChange (e, 'expiresMonth')}
                  placeholder="12"
                  ref={inputRefs.expiresMonth}
                />
                <span>/</span>
                <input
                  required
                  maxLength={2}
                  type="text"
                  id={Styles.expiresYear}
                  name="expiresYear"
                  value={formData.expiresYear}
                  onChange={e => handleInputChange (e, 'expiresYear')}
                  placeholder="23"
                  ref={inputRefs.expiresYear}
                />
              </div>
            </div>
            {isAmericaExpressCard
              ? <div className={Styles.formGroupCvv}>
                  <p>CVV</p>
                  <input
                    required
                    maxLength={4}
                    type="text"
                    id={Styles.cvv}
                    name="cvv"
                    value={formData.cvv}
                    placeholder="CVV"
                    onChange={e => handleInputChange (e, 'cvv')}
                    ref={inputRefs.cvv}
                  />
                </div>
              : <div className={Styles.formGroupCvv}>
                  <p>CVV</p>
                  <input
                    required
                    maxLength={3}
                    type="text"
                    id={Styles.cvv}
                    name="cvv"
                    value={formData.cvv}
                    placeholder="CVV"
                    onChange={e => handleInputChange (e, 'cvv')}
                    ref={inputRefs.cvv}
                  />
                </div>}
          </div>
          <div className={Styles.btn}>
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? '' : 'gray',
                color: isFormValid ? '' : 'white',
              }}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>}
      {isRed &&
        <CheckerModal
          img={RedChecker}
          text={'Invalid Credit Card'}
          btnText={'Try Again'}
        />}
      {isOpen &&
        <CheckerModal
          img={GreenChecker}
          text={'Valid Credit Card'}
          btnText={'close Modal'}
        />}
    </div>
  );
};

export default CardForm;
