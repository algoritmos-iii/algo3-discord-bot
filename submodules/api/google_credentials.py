#!/usr/bin/env python3

from __future__ import annotations
from __future__ import print_function

import os
import json
from typing import List
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials as ServiceAccountCredentials
from google.oauth2.credentials import Credentials as OAuthCredentials


class GoogleCredentials:
    __credentials: OAuthCredentials | ServiceAccountCredentials = None
    SCOPES: List[str] = [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ]

    def __init__(self, refresh_token: str=None, refresh_token_file: str=None, client_secret_file: str=None, service_account_info: str=None) -> None:
        if refresh_token is not None:
            self.__credentials = OAuthCredentials.from_authorized_user_info(
                json.loads(refresh_token), self.SCOPES)

        elif refresh_token_file is not None and client_secret_file is not None:
            if os.path.exists(refresh_token_file):
                self.__credentials = OAuthCredentials.from_authorized_user_file(
                    refresh_token_file, scopes=self.SCOPES)

            if not self.__credentials or not self.__credentials.valid:
                if self.__credentials and self.__credentials.expired and self.__credentials.refresh_token:
                    self.__credentials.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        client_secret_file, self.SCOPES)
                    self.__credentials = flow.run_local_server(port=0)

                # Save the credentials in a file for the next run
                with open(refresh_token_file, 'w') as token:
                    token.write(self.__credentials.to_json())

        elif service_account_info is not None:
            self.__credentials = ServiceAccountCredentials.from_service_account_info(
                json.loads(service_account_info), scopes=self.SCOPES)

        else:
            raise Exception("No credentials provided")

    @classmethod
    def from_refresh_token(cls, refresh_token: str) -> GoogleCredentials:
        return GoogleCredentials(refresh_token=refresh_token)

    @classmethod
    def from_service_account(cls, service_account_info: str) -> GoogleCredentials:
        return GoogleCredentials(service_account_info=service_account_info)

    @classmethod
    def from_authorized_user_file(cls, refresh_token_file: str, client_secret_file: str) -> GoogleCredentials:
        return GoogleCredentials(refresh_token_file=refresh_token_file, client_secret_file=client_secret_file)

    def credentials(self):
        return self.__credentials
