package io.precious.cardvalidatingsystem.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.service.CardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import io.precious.cardvalidatingsystem.util.Constants;

class CardControllerTest {

    private CardController cardController;
    private CardService cardService;

    @BeforeEach
    void setUp() {
        cardService = mock(CardService.class);
        cardController = new CardController(cardService);
    }

    @Test
    void testValidateCardValid() {
        CreditCardDto cardDto = new CreditCardDto("1234567890123456", "123", "12/25");
        CardValidationResponse successResponse = new CardValidationResponse(Constants.VALIDATION_SUCCESSFUL, Collections.emptyList());
        when(cardService.validateCard(cardDto)).thenReturn(successResponse);
        ResponseEntity<CardValidationResponse> responseEntity = cardController.validateCard(cardDto);

        verify(cardService, times(1)).validateCard(cardDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(successResponse, responseEntity.getBody());
    }

    @Test
    void testValidateCardInvalid() {
        CreditCardDto cardDto = new CreditCardDto("6758675767576565765", "13", "12/22");
        CardValidationResponse errorResponse = new CardValidationResponse(Constants.VALIDATION_FAILED, Collections.singletonList("Invalid card number"));
        when(cardService.validateCard(cardDto)).thenReturn(errorResponse);
        ResponseEntity<CardValidationResponse> responseEntity = cardController.validateCard(cardDto);

        verify(cardService, times(1)).validateCard(cardDto);
        CardValidationResponse responseBody = responseEntity.getBody();
        assertEquals(Constants.VALIDATION_FAILED, responseBody.getValidationStatus());
        assertEquals(errorResponse, responseBody);
    }
}
