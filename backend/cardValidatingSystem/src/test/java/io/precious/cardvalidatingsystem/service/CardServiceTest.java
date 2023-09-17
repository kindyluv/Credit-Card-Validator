package io.precious.cardvalidatingsystem.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.util.ValidationUtil;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

import static io.precious.cardvalidatingsystem.util.Constants.VALIDATION_SUCCESSFUL;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class CardServiceTest {

    @InjectMocks
    private CardService cardService;

    @Mock
    private ValidationUtil validationUtil;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testValidCardValidation() {
        CreditCardDto cardDto = new CreditCardDto("ValidCardNumber", "123", "12/23");

        when(validationUtil.checkCardNumberLength(cardDto.getCardNumber())).thenReturn("");
        when(validationUtil.checkExpiryDate(cardDto.getCardExpiryDate())).thenReturn("");
        when(validationUtil.checkCvv(cardDto.getCardNumber(), cardDto.getCardCVV())).thenReturn("");
        when(validationUtil.checkWithLuhnsAlgo(cardDto.getCardNumber())).thenReturn("");

        ResponseEntity<CardValidationResponse> response = cardService.validateCard(cardDto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(VALIDATION_SUCCESSFUL, Objects.requireNonNull(response.getBody()).getValidationStatus());
    }

    @Test
    public void testInvalidCardValidation() {
        CreditCardDto cardDto = new CreditCardDto("InvalidCardNumber", "123", "12/23");

        when(validationUtil.checkCardNumberLength(cardDto.getCardNumber())).thenReturn("Invalid card number length");
        when(validationUtil.checkExpiryDate(cardDto.getCardExpiryDate())).thenReturn("Invalid expiry date");
        when(validationUtil.checkCvv(cardDto.getCardNumber(), cardDto.getCardCVV())).thenReturn("Invalid CVV");
        when(validationUtil.checkWithLuhnsAlgo(cardDto.getCardNumber())).thenReturn("Invalid Luhn's algorithm check");

        ResponseEntity<CardValidationResponse> response = cardService.validateCard(cardDto);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("failed", Objects.requireNonNull(response.getBody()).getValidationStatus());
    }
}
