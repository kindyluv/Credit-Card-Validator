package io.precious.cardvalidatingsystem.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.LocalDate;

@Component
public class ValidationUtil {

    public String checkCardNumberLength(String cardNumber) {
        return cardNumber.length() >= 16 & cardNumber.length() <= 19
                ? "" : "Length of card number is wrong";
    }

    public String checkExpiryDate(String cardExpiryDate) {
        if (cardExpiryDate.length() != 5) return "Length of expiry date is wrong";     // checking if the length of date string is valid
        if (cardExpiryDate.charAt(2) != '/') return "Expiry date is in the wrong format";  // I'm checking the date string format

        String[] monthAndYear = cardExpiryDate.split("/");
        int cardMonth;
        int cardYear;
        try {
            cardMonth = Integer.parseInt(monthAndYear[0]);      // extracting month from date string and confirming it's a number
            cardYear = Integer.parseInt(monthAndYear[1]);       // extracting year from date string and confirming it's a number
        } catch (NumberFormatException ex) {
            return "Check expiry date month and/or year";
        }
        LocalDate currentDate = LocalDate.now(Clock.systemDefaultZone());
        int lastTwoDigitsOfCurrentYear = currentDate.getYear() - 2000;
        int differenceInYears = cardYear - lastTwoDigitsOfCurrentYear;

        return cardMonth >= currentDate.getMonthValue()
                && (differenceInYears >= 0 && differenceInYears <= 4) //checking years difference is within permissible card lifetime
        ? "" : "Expiry date must be within allowed card lifetime";
    }

    public String checkCvv(String cardNumber, String cvv) {
        if (cardNumber.startsWith("34") || cardNumber.startsWith("37"))
            return cvv.length() == 4 ? "" : "American Express Card CVV is wrong";
        return cvv.length() == 3 ? "" : "Card CVV is wrong";
    }

    public String checkWithLuhnsAlgo(String cardNumber) {
        try {
            int sumOfAllDigits = 0;
            boolean isAlternate = false;                // to flag alternate positions
            for (int idx = cardNumber.length() - 1; idx >= 0; idx--) {
                int digit = Integer.parseInt(String.valueOf(cardNumber.charAt(idx)));
                if (isAlternate) {
                    digit *= 2;
                    if (digit > 9) digit = (digit % 10) + 1;
                }
                sumOfAllDigits += digit;
                isAlternate = !isAlternate;
            }

            return sumOfAllDigits % 10 == 0 ? "" : "Card number failed Luhn's algorithm test";
        } catch (Exception e) {
            return "Card number must be numbers only";
        }
    }
}
