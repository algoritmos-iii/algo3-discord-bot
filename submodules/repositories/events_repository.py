import datetime
from typing import Any, Dict
from ..api.api_service import APIService


class EventsRepository:

    def __init__(self, calendarService: APIService, calendar_id: str) -> None:
        self.__calendar_id = calendar_id
        self.__service = calendarService

    def events(self):
        return self.__service.service().events()

    def next_event(self) -> Dict[str, Any]:
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        print(f'Getting event from: {now.split()}')
        request = self.events().list(calendarId=self.__calendar_id, timeMin=now,
                                     maxResults=1, singleEvents=True, orderBy='startTime')
        response = request.execute()

        if len(response.get('items', [])) == 0:
            print('No upcoming events found. CHECK IF THE CALENDAR ID IS CORRECT')
            return {}

        return response.get('items', [])[0]
