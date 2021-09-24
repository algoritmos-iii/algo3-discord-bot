#!/usr/bin/env python3
from __future__ import print_function

import os
import dotenv
from api.api_service import APIService
from api.google_credentials import GoogleCredentials
from repositories.alumnos_repository import AlumnosRepository

dotenv.load_dotenv()

CALENDAR_ID = os.environ.get('CALENDAR_ID')
SERVICE_ACCOUNT_INFO = os.environ.get('SERVICE_ACCOUNT_INFO')


def main():
    credentials = GoogleCredentials.from_service_account(SERVICE_ACCOUNT_INFO)
    calendar_service = APIService(service_name='calendar', api_version='v3', google_credentials=credentials)

    alumnos = AlumnosRepository(calendar_service, CALENDAR_ID)

    alumnos.to_json()

main()
