/**
 * GOOGLE APPS SCRIPT PER ATHLETE HUB (SOCCER TEAM MANAGER)
 * 
 * ISTRUZIONI PER LA CONFIGURAZIONE:
 * 1. Accedi a Google Drive (https://drive.google.com/) con il tuo account Google.
 * 2. Clicca su "+ Nuovo" in alto a sinistra -> "Altro" -> "Google Apps Script".
 *    (Se non lo trovi, vai direttamente su https://script.google.com/ e clicca su "Nuovo progetto").
 * 3. Cancella tutto il codice presente nell'editor e incolla questo intero file.
 * 4. Clicca sul pulsante "Salva" (icona del floppy disk) o premi Ctrl+S. Rinomina il progetto (es. "Athlete Hub Sync").
 * 5. Clicca su "Distribuisci" (in alto a destra) -> "Nuova implementazione".
 * 6. Clicca sull'icona dell'ingranaggio ("Seleziona tipo") e seleziona "Applicazione web".
 * 7. Configura i campi come segue:
 *    - Descrizione: Athlete Hub Database Sync
 *    - Esegui come: "Tu" (il tuo indirizzo email)
 *    - Chi ha accesso: "Chiunque" (oppure "Anyone" - FONDAMENTALE affinché i ragazzi possano inviare i dati)
 * 8. Clicca su "Distribuisci".
 * 9. Se richiesto, clicca su "Autorizza accesso" e seleziona il tuo account Google. Se compare la schermata "Google non ha verificato questa app", clicca su "Avanzate" (in basso) e poi su "Vai a... (non sicura)" per procedere.
 * 10. Copia l'URL dell'applicazione web fornito nella schermata finale (deve finire con "/exec").
 * 11. Apri la tua applicazione Athlete Hub (Coach), vai nella scheda "Gestione Database", incolla l'URL nel campo "URL Google Apps Script" e premi "Forza Invio" per inizializzare il database online con i tuoi atleti reali dell'Albinoleffe.
 * 12. Genera il nuovo link nella scheda "Portale Giocatori" e invialo ai ragazzi. Ora vedranno i loro nomi reali!
 */

function doGet() {
  var fileName = "soccer_team_db.json";
  var files = DriveApp.getFilesByName(fileName);
  var content = "";
  
  if (files.hasNext()) {
    var file = files.next();
    content = file.getAs("MIME_TXT").getDataAsString();
  } else {
    // Database di default vuoto se il file non esiste ancora su Google Drive
    var defaultDb = {
      players: [],
      dailyLogs: [],
      physicalTests: [],
      squatProfiles: {},
      neuromuscularTests: {},
      calendarEvents: []
    };
    content = JSON.stringify(defaultDb);
  }
  
  return ContentService.createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var fileName = "soccer_team_db.json";
  var content = e.postData.contents;
  
  var files = DriveApp.getFilesByName(fileName);
  var file;
  
  if (files.hasNext()) {
    file = files.next();
    file.setContent(content);
  } else {
    file = DriveApp.createFile(fileName, content, MimeType.PLAIN_TEXT);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
