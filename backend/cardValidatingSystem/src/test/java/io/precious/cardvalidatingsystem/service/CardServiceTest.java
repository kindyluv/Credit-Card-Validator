package io.precious.cardvalidatingsystem.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.util.ValidationUtil;

import static io.precious.cardvalidatingsystem.util.Constants.VALIDATION_SUCCESSFUL;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

public class CardServiceTest {

    private CardService cardService;

    @BeforeEach
    public void setUp() {
        cardService = new CardService(new ValidationUtil());
    }

    @Test
    public void testValidCardValidation() {
        CreditCardDto cardDto = new CreditCardDto("5298202628250195", "123", "12/23");
        CardValidationResponse response = cardService.validateCard(cardDto);

        assertEquals(VALIDATION_SUCCESSFUL, response.getValidationStatus());
        assertEquals(List.of(), response.getValidationErrors());
    }

    @Test
    public void testInvalidCardValidation() {
        CreditCardDto cardDto = new CreditCardDto("5298202628250185", "13", "06/23");
        CardValidationResponse response = cardService.validateCard(cardDto);

        assertEquals("failed", response.getValidationStatus());
        assertEquals(3, response.getValidationErrors().size());
    }
}
