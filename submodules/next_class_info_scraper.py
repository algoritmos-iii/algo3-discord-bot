#!/usr/bin/env python3
from __future__ import print_function

import os
import json
import dotenv
from .api.api_service import APIService
from .api.google_credentials import GoogleCredentials
from .repositories.events_repository import EventsRepository

dotenv.load_dotenv()

CALENDAR_ID = os.environ.get('CALENDAR_ID')
SERVICE_ACCOUNT_INFO = os.environ.get('SERVICE_ACCOUNT_INFO')

SERVICE_NAME = 'calendar'
API_VERSION = 'v3'

def main():
    credentials = GoogleCredentials.from_service_account(SERVICE_ACCOUNT_INFO)
    calendar_service = APIService(service_name=SERVICE_NAME, api_version=API_VERSION, google_credentials=credentials)
    events = EventsRepository(calendar_service, CALENDAR_ID)

    next_event = events.next_event()

    with open('./dist/assets/event.json', 'w') as eventsFile:
        json.dump(next_event, eventsFile, indent=4, ensure_ascii=False)

main()