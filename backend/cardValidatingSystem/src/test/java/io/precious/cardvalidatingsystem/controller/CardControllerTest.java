package io.precious.cardvalidatingsystem.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.service.CardService;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CardControllerTest {

    private CardController cardController;

    @Mock
    private CardService cardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cardController = new CardController(cardService);
    }

    @Test
    void testValidateCardValid() {
        CreditCardDto cardDto = new CreditCardDto("1234567890123456", "123", "12/25");
        CardValidationResponse successResponse = new CardValidationResponse("SUCCESS", null);
        when(cardService.validateCard(cardDto)).thenReturn(ResponseEntity.ok(successResponse));
        ResponseEntity<CardValidationResponse> responseEntity = cardController.validateCard(cardDto);
        verify(cardService, times(1)).validateCard(cardDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(successResponse, responseEntity.getBody());
    }

    @Test
    void testValidateCardInvalid() {
        CreditCardDto cardDto = new CreditCardDto("1234567890123456", "123", "12/25");
        CardValidationResponse errorResponse = new CardValidationResponse("FAILURE", Collections.singletonList("Invalid card number"));
        when(cardService.validateCard(cardDto)).thenReturn(ResponseEntity.badRequest().body(errorResponse));
        ResponseEntity<CardValidationResponse> responseEntity = cardController.validateCard(cardDto);
        verify(cardService, times(1)).validateCard(cardDto);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(errorResponse, responseEntity.getBody());
    }
}
