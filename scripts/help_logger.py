import os
import sys
import dotenv
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials

dotenv.load_dotenv()

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SHEET_ID = os.environ.get("HELP_SHEET_ID") 
SERVICE_ACCOUNT = os.environ.get("SERVICE_ACCOUNT_INFO")
CREDENTIALS = ServiceAccountCredentials.from_json_keyfile_dict(json.loads(SERVICE_ACCOUNT), scopes=SCOPES)

def main():
    client = gspread.authorize(CREDENTIALS)
    sheet = client.open_by_key(SHEET_ID).sheet1
    fechaDeCreacion = sys.argv[1]
    grupo = sys.argv[2]
    cierre = sys.argv[3]
    brindador = ' '.join(sys.argv[4:])
    sheet.append_row([fechaDeCreacion, grupo, cierre, brindador])

if __name__ == "__main__":
    main()
