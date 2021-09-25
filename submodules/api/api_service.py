#!/usr/bin/env python3

from .google_credentials import GoogleCredentials
from googleapiclient.discovery import Resource, build


class APIService(object):
    __service: Resource

    def __init__(self, service_name: str, api_version: str, google_credentials: GoogleCredentials) -> None:
        self.__service = build(service_name, api_version,
                               credentials=google_credentials.credentials())

    def service(self) -> Resource:
        return self.__service
