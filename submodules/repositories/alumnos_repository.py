#!/usr/bin/env python3
import json
from ..api.api_service import APIService


class AlumnosRepository:
    SHEET_ALUMNOS = 'Listado'
    SHEET_RANGE = 'A1:E58'

    def __init__(self, calendarService: APIService, spreadsheet_id: str) -> None:
        self.__spreadsheet_id = spreadsheet_id
        self.__service = calendarService

    def __get_sheet(self):
        request = self.__service.service().spreadsheets().values().get(spreadsheetId=self.__spreadsheet_id, range=f'{self.SHEET_ALUMNOS}!{self.SHEET_RANGE}')
        response = request.execute()    

        return response

    def to_tsv(self):
        sheet = self.__get_sheet()
        with open(f'./assets/{self.SHEET_ALUMNOS}.tsv', 'w') as file:
            for row in sheet.get('values', []):
                # TODO: refactorizar 
                file.write('\t'.join(list(map(lambda value: value.rstrip('\n'), row))) + '\n')

    def to_json(self):
        sheet = self.__get_sheet()
        with open(f'./assets/{self.SHEET_ALUMNOS}.json', 'w') as file:
            json.dump(sheet.get('values', []), file, indent=4, ensure_ascii=False)