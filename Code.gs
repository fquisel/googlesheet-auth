function doGet(e) {
  const html = HtmlService.createTemplateFromFile("index");
  return (
    html.evaluate()
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function connectSSA() {
  //URL .ENV --> AUTH ON SHEET
  const url = "SHEET URL HERE";
  const ssa = SpreadsheetApp.openByUrl(url);
  return ssa.getSheetByName('users');
}

function signUp(
  email,
  password,
  firstName,
  lastName,
  phoneNumber
) {
  const sheetDB = connectSSA();
  sheetDB.appendRow([
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  ]);
  return true;
}

function signIn(email, password) {
  const sheetDB = connectSSA();
  for (let i = 1; i <= sheetDB.getLastRow(); i++) {
    if (
      email && 
      password &&
      sheetDB.getRange(i, 1).getValue().toLowerCase() == email.toLowerCase()  && 
      sheetDB.getRange(i, 2).getValue() == password
    ) {
      const data = {
        email: sheetDB.getRange(i, 1).getValue().toLowerCase(),
        firstName: sheetDB.getRange(i, 3).getValue(),
        lastName: sheetDB.getRange(i, 4).getValue(),
        phoneNumber: sheetDB.getRange(i, 5).getValue()
      }
      return data;
    } 
  } 
  return;
}

function verifyAccount(email) {
  const sheetDB = connectSSA();
  for (let i = 1; i <= sheetDB.getLastRow(); i++) {
    if (email && sheetDB.getRange(i, 1).getValue().toLowerCase()  == email.toLowerCase() ) {
      return true;
    }  
  } 
  return;
}