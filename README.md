# adjust-app-script

Replace the following variables with your actual data:

- **bearerToken**: Your authentication API token (if applicable).
- **appTokenIn**: Your app token.
- **targetSheetId**: The ID of the target Google Sheet where the data will be written.
- **targetSheetName**: The name of the target sheet in the target Google Sheet.

## Get Event Names 

```
curl --location --request GET 'https://dash.adjust.com/control-center/reports-service/events?event__contains=purchase' \
--header 'Authorization: Bearer <bearerToken>'
```

### Set Up Target Google Sheet:
Ensure you have the target Google Sheet ready to receive the data. If the sheet doesn't exist, the function will create a new one with the specified targetSheetName.

### Execute the Script:
Save the script with the modified main function. You can run the script from the Apps Script editor or use a trigger to automate the data retrieval and writing process.

https://help.adjust.com/en/article/csv-reports-endpoint
