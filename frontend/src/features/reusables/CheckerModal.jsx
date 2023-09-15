import { useState } from 'react';
import Marker from '../../assets/Checker.svg'

const CheckerModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div style={ModalWrapper}>
          <div style={ContentWrapper}>
            <div style={ImageWrapper}>
              <img src={Marker} alt='Marker' style={MarkerStyle} />
            </div>
            <div style={TextWrapper}>
              <p style={ValidCard}>Valid Credit Card</p>
            </div>
            <button style={ButtonStyle} onClick={handleCloseModal}>
              close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckerModal;

export const ValidCard= { 
    fontSize: '28px', 
    fontWeight: '700', 
    color: '#000', 
    textAlign: 'center' 
}
export const ModalWrapper = {
  zIndex: '2',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const ContentWrapper = {
  width: '500px',
  height: '500px',
  backgroundColor: 'white',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const MarkerStyle ={
  width: '200px',
  height: '',
}

export const ImageWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2% 0%',
};

export const TextWrapper = {
  margin: '3% 0%',
  padding: '0% 20px',
};

export const ButtonStyle = {
  margin: '2% 0% 5% 0%',
  padding: '10px 16px',
  backgroundColor: '#2BAE00',
  color: 'white',
  width: '70%',
  borderRadius: '8px',
  border: 'none',
  textTransform: 'none',
};
