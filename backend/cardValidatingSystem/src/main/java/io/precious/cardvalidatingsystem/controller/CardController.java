package io.precious.cardvalidatingsystem.controller;

import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/card/")
@CrossOrigin(origins = "*")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("validate")
    public ResponseEntity<CardValidationResponse> validateCard(@RequestBody CreditCardDto cardDto) {
        CardValidationResponse response = cardService.validateCard(cardDto);
        return ResponseEntity.ok().body(response);
    }
}
