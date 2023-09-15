package io.precious.cardvalidatingsystem.model.dto;

public class CreditCardDto {

    private String cardNumber;
    private String cardCVV;
    private String cardExpiryDate;

    public CreditCardDto() {
    }

    public CreditCardDto(String cardNumber, String cardCVV, String cardExpiryDate) {
        this.cardNumber = cardNumber;
        this.cardCVV = cardCVV;
        this.cardExpiryDate = cardExpiryDate;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardCVV() {
        return cardCVV;
    }

    public void setCardCVV(String cardCVV) {
        this.cardCVV = cardCVV;
    }

    public String getCardExpiryDate() {
        return cardExpiryDate;
    }

    public void setCardExpiryDate(String cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    @Override
    public String toString() {
        return "{" +
                "\"cardNumber\": \"" + cardNumber + "\"," +
                "\"cardCVV\": \"" + cardCVV + "\"," +
                "\"cardExpiryDate\": \"" + cardExpiryDate + "\"" +
                '}';
    }
}
