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
    grupo = ' '.join(sys.argv[1])
    cierre = sys.argv[2]
    brindador = ' '.join(sys.argv[3:])
    sheet.append_row([grupo, cierre, brindador])

if __name__ == "__main__":
    main()
