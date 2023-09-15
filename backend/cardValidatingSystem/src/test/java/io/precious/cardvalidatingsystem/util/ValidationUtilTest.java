package io.precious.cardvalidatingsystem.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

import io.precious.cardvalidatingsystem.util.ValidationUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ValidationUtilTest {

    private ValidationUtil validationUtil;

    @BeforeEach
    void setUp() {
        validationUtil = new ValidationUtil();
    }

    @Test
    void testCheckCardNumberLengthValid() {
        String cardNumber = "4111111111111111";
        String result = validationUtil.checkCardNumberLength(cardNumber);
        assertEquals("success", result);
    }

    @Test
    void testCheckCardNumberLengthInvalid() {
        String cardNumber = "4111";
        String result = validationUtil.checkCardNumberLength(cardNumber);
        assertEquals("Length of card number is wrong", result);
    }

    @Test
    void testCheckExpiryDateValid() {
        String cardExpiryDate = "12/25";
        String result = validationUtil.checkExpiryDate(cardExpiryDate);
        assertEquals("", result);
    }

    @Test
    void testCheckExpiryDateInvalidLength() {
        String cardExpiryDate = "2/2";
        String result = validationUtil.checkExpiryDate(cardExpiryDate);
        assertEquals("Length of expiry date is wrong", result);
    }

    @Test
    void testCheckExpiryDateInvalidFormat() {
        String cardExpiryDate = "12-25";
        String result = validationUtil.checkExpiryDate(cardExpiryDate);
        assertEquals("Expiry date is in the wrong format", result);
    }

    @Test
    void testCheckExpiryDateInvalidMonth() {
        String cardExpiryDate = "13/25";
        String result = validationUtil.checkExpiryDate(cardExpiryDate);
        assertEquals("Expiry date must be within allowed card lifetime", result);
    }

    @Test
    void testCheckExpiryDateInvalidYear() {
        String cardExpiryDate = "12/21";
        String result = validationUtil.checkExpiryDate(cardExpiryDate);
        assertEquals("Expiry date must be within allowed card lifetime", result);
    }

    @Test
    void testCheckCvvValid() {
        String cardNumber = "4111111111111111";
        String cvv = "123";
        String result = validationUtil.checkCvv(cardNumber, cvv);
        assertEquals("", result);
    }

    @Test
    void testCheckCvvInvalid() {
        String cardNumber = "340000000000000";
        String cvv = "12345";
        String result = validationUtil.checkCvv(cardNumber, cvv);
        assertEquals("American Express Card CVV is wrong", result);
    }

    @Test
    void testCheckWithLuhnsAlgoValid() {
        String cardNumber = "4111111111111111";
        String result = validationUtil.checkWithLuhnsAlgo(cardNumber);
        assertEquals("", result);
    }

    @Test
    void testCheckWithLuhnsAlgoInvalid() {
        String cardNumber = "4111111111111112";
        String result = validationUtil.checkWithLuhnsAlgo(cardNumber);
        assertEquals("Card number failed Luhn's algorithm test", result);
    }
}
