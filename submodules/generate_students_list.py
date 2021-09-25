#!/usr/bin/env python3
from __future__ import print_function

import os
import dotenv
from .api.api_service import APIService
from .api.google_credentials import GoogleCredentials
from .repositories.alumnos_repository import AlumnosRepository

dotenv.load_dotenv()

SPREADSHEET_ID = os.environ.get('SPREADSHEET_ID')
REFRESH_TOKEN = os.environ.get('REFRESH_TOKEN')


def main():
    credentials = GoogleCredentials.from_refresh_token(REFRESH_TOKEN)
    calendar_service = APIService(service_name='sheets', api_version='v4', google_credentials=credentials)

    alumnos = AlumnosRepository(calendar_service, SPREADSHEET_ID)

    alumnos.to_json('./dist/assets')

main()
