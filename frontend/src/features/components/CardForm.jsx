import React, {useRef, useState} from 'react';
import Styles from '../styles/CardForm.module.css';
import CheckerModal from '../reusables/CheckerModal';
import axios from 'axios';
import {validateUrl} from '../../api/Api';
import CardLogo from '../../assets/CardLogo.svg';
import GreenChecker from '../../assets/Checker.svg'
import RedChecker from '../../assets/RedChecker.svg'

const CardForm = () => {
  const [formData, setFormData] = useState ({
    cardNumberOne: '',
    cardNumberTwo: '',
    cardNumberThree: '',
    cardNumberFour: '',
    expiresMonth: '',
    expiresYear: '',
    fullName: '',
    cvv: '',
  });

  const [isOpen, setIsOpen] = useState (false);
  const [isRed, setIsRed] = useState (false);
  const [colorChange, setColorChange] = useState(null);
  const inputRefs = {
    cardNumberOne: useRef(null),
    cardNumberTwo: useRef(null),
    cardNumberThree: useRef(null),
    cardNumberFour: useRef(null),
    expiresMonth: useRef(null),
    expiresYear: useRef(null),
    cvv: useRef(null),
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e, inputName) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (inputName !== 'cvv' && value.length === 4) {
      const nextInputName = getNextInputName(inputName);
      if (nextInputName) {
        inputRefs[nextInputName].current.focus();
      }
    }
    if (inputName !== 'cvv' && inputName === 'expiresMonth' && value.length === 2) {
      const nextInputName = getNextInputName(inputName);
      if (nextInputName) {
        inputRefs[nextInputName].current.focus();
      }
    }   
    if (inputName !== 'cvv' && inputName === 'expiresYear' && value.length === 2) {
      const nextInputName = getNextInputName(inputName);
      if (nextInputName) {
        inputRefs[nextInputName].current.focus();
      }
    }
  };

  const getNextInputName = (currentInputName) => {
    const inputNames = Object.keys(inputRefs);
    const currentIndex = inputNames.indexOf(currentInputName);

    if (currentIndex === -1 || currentIndex === inputNames.length - 1) {
      return null;
    }

    return inputNames[currentIndex + 1];
  };


  const handleSubmit = async e => {
    e.preventDefault ();
    setIsLoading(true);
    try {
      const formattedDate = `${formData.expiresMonth}/${formData.expiresYear.slice(-2)}`;
      const cardNumber =
        formData.cardNumberOne + formData.cardNumberTwo + formData.cardNumberThree + formData.cardNumberFour;
      const data = {
        cardNumber: cardNumber,
        cardCVV: formData.cvv,
        cardExpiryDate: formattedDate,
      };
      console.log(data);

      const response = await axios.post(validateUrl, data);
      if(response.status === 200){
        setIsOpen(!isOpen);
        setColorChange('green');
      }
    } catch (error) {
      console.error('Error:', error);
      setColorChange('red');
      setIsRed(!isRed)
    } finally {
      setIsLoading(false);
    }
  };

  const getStyle = () => {
    console.log(`\n\nCOLOUR ==> ${colorChange}\n`)
    if (colorChange === 'green') return Styles.colorChange
    else if (colorChange === 'red') return Styles.colorChangeRed
    return Styles.cardValidator
  };

  return (
    <div className={`${Styles.container} ${isOpen && Styles.centerContainer}`}>
      <div className={`${getStyle()}`} style={{backgroundColor: colorChange === 'green' ? 'green' : colorChange === 'red' ? 'red' : 'black'}}>
        <div className={Styles.cardPtag}>
          <p>Card Validator</p>
          <img src={CardLogo} alt="Card Validator" />
        </div>
        <div className={Styles.cardFullNamePtag}>
          <p>{formData.fullName === '' ? 'PRECIOUS ONYEUKWU' : formData.fullName}</p>
        </div>
        <div className={Styles.cardInput}>
          <p>
            {formData.cardNumberOne === '' ? '0000' :  formData.cardNumberOne}
            {' '}
            {formData.cardNumberTwo === '' ? '0000' :  formData.cardNumberTwo}
            {' '}
            {formData.cardNumberThree === '' ? '0000' :  formData.cardNumberThree}
            {' '}
            {formData.cardNumberFour === '' ? '0000' :  formData.cardNumberFour}
          </p>
        </div>
        <div className={Styles.cardCvvContain}>
          <div className={Styles.cardExpiryDate}>
            <p>Expiry</p>
            <p>
              {formData.expiresMonth === '' ? '12' : formData.expiresMonth}
              /
              {formData.expiresYear === '' ? '23' : formData.expiresYear}
            </p>
          </div>
          <div className={Styles.cardCvv}>
            <p>CVV</p>
            <p><span>{formData.cvv === '' ? '277' : formData.cvv}</span></p>
          </div>
        </div>
      </div>
      {!isOpen &&<form className={`${Styles.form} ${isOpen && Styles.disableForm}`} onSubmit={handleSubmit}>
        <div className={Styles.fullNameContain}>
          <p>Card Holder</p>
          <input
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
                maxLength={4}
                type="text"
                id={Styles.cardNumberOne}
                name="cardNumberOne"
                value={formData.cardNumberOne}
                onChange={(e)=>handleInputChange(e, 'cardNumberOne')}
                placeholder="0000"
                ref={inputRefs.cardNumberOne}
              />
            </div>
            <div className={Styles.cardNumberTwo}>
              <input
                maxLength={4}
                type="text"
                id={Styles.cardNumberTwo}
                name="cardNumberTwo"
                value={formData.cardNumberTwo}
                onChange={(e)=>handleInputChange(e, 'cardNumberTwo')}
                placeholder="0000"
                ref={inputRefs.cardNumberTwo}
              />
            </div>
            <div className={Styles.cardNumberThree}>
              <input
                maxLength={4}
                type="text"
                id={Styles.cardNumberThree}
                name="cardNumberThree"
                value={formData.cardNumberThree}
                onChange={(e)=>handleInputChange(e, 'cardNumberThree')}
                placeholder="0000"
                ref={inputRefs.cardNumberThree}
              />
            </div>
            <div className={Styles.cardNumberFour}>
              <input
                maxLength={4}
                type="text"
                id={Styles.cardNumberFour}
                name="cardNumberFour"
                value={formData.cardNumberFour}
                onChange={(e)=>handleInputChange(e, 'cardNumberFour')}
                placeholder="0000"
                ref={inputRefs.cardNumberFour}
              />
            </div>
          </div>
        </div>
        <div className={Styles.rightDiv}>
          <div className={Styles.expiryDate}>
            <p>Exp. Date</p>
            <div className={Styles.expireForm}>
              <input
                maxLength={2}
                type="text"
                id={Styles.expiresMonth}
                name="expiresMonth"
                value={formData.expiresMonth}
                onChange={(e)=>handleInputChange(e, 'expiresMonth')}
                placeholder="12"
                ref={inputRefs.expiresMonth}
              />
              <span>/</span>
              <input
                maxLength={2}
                type="text"
                id={Styles.expiresYear}
                name="expiresYear"
                value={formData.expiresYear}
                onChange={(e)=>handleInputChange(e, 'expiresYear')}
                placeholder="23"
                ref={inputRefs.expiresYear}
              />
            </div>
          </div>
          <div className={Styles.formGroupCvv}>
            <p>CVV</p>
            <input
              maxLength={4}
              type="text"
              id={Styles.cvv}
              name="cvv"
              value={formData.cvv}
              placeholder="CVV"
              onChange={(e)=>handleInputChange(e, 'cvv')}
              ref={inputRefs.cvv}
            />
          </div>
        </div>
        <div className={Styles.btn}>
          <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
        </div>
      </form>}
      {isRed && <CheckerModal img={RedChecker} text={'Invalid Credit Card'} btnText={'Try Again'}  />}
      {isOpen && <CheckerModal img={GreenChecker} text={'Valid Credit Card'} btnText={'close Modal'} />}
    </div>
  );
};

export default CardForm;
