package io.precious.cardvalidatingsystem.service;

import io.precious.cardvalidatingsystem.model.dto.CardValidationResponse;
import io.precious.cardvalidatingsystem.model.dto.CreditCardDto;
import io.precious.cardvalidatingsystem.util.Constants;
import io.precious.cardvalidatingsystem.util.ValidationUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static io.precious.cardvalidatingsystem.util.Constants.VALIDATION_FAILED;
import static io.precious.cardvalidatingsystem.util.Constants.VALIDATION_SUCCESSFUL;

@Service
public class CardService {

    private final ValidationUtil validationUtil;

    public CardService(ValidationUtil validationUtil) {
        this.validationUtil = validationUtil;
    }

    public CardValidationResponse validateCard(CreditCardDto cardDto) {
        List<String> listOfErrors = new ArrayList<>();

        String lengthCheck = validationUtil.checkCardNumberLength(cardDto.getCardNumber());
        if (!lengthCheck.isEmpty() && !lengthCheck.isBlank()) listOfErrors.add(lengthCheck);

        String dateCheck = validationUtil.checkExpiryDate(cardDto.getCardExpiryDate());
        if (!dateCheck.isEmpty() && !dateCheck.isBlank()) listOfErrors.add(dateCheck);

        String cvvCheck = validationUtil.checkCvv(cardDto.getCardNumber(), cardDto.getCardCVV());
        if (!cvvCheck.isEmpty() && !cvvCheck.isBlank()) listOfErrors.add(cvvCheck);

        String luhnsCheck = validationUtil.checkWithLuhnsAlgo(cardDto.getCardNumber());
        if (!luhnsCheck.isEmpty() && !luhnsCheck.isBlank()) listOfErrors.add(luhnsCheck);

        if (listOfErrors.isEmpty()) {
            CardValidationResponse response = new CardValidationResponse(VALIDATION_SUCCESSFUL, listOfErrors);
            return response;
        }
        CardValidationResponse response = new CardValidationResponse(VALIDATION_FAILED, listOfErrors);
        return response;
    }
}
