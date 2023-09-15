package io.precious.cardvalidatingsystem.model.dto;

import java.util.ArrayList;
import java.util.List;

public class CardValidationResponse {

    private String validationStatus;
    private List<String> validationErrors;

    public CardValidationResponse() {
    }

    public CardValidationResponse(String validationStatus, List<String> validationErrors) {
        this.validationStatus = validationStatus;
        this.validationErrors = validationErrors;
    }

    public String getValidationStatus() {
        return validationStatus;
    }

    public void setValidationStatus(String validationStatus) {
        this.validationStatus = validationStatus;
    }

    public List<String> getValidationErrors() {
        return validationErrors;
    }

    public void setValidationErrors(List<String> validationErrors) {
        this.validationErrors = validationErrors;
    }
}
