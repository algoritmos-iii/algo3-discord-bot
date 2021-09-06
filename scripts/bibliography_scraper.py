from typing import Pattern
from bs4 import BeautifulSoup
import urllib.request
import re
import json


def write_json(on: str, data: dict):
    print('Writing json file...')
    with open(on, "w") as outfile:
        json.dump([{"name": name, "url": url} for name, url in data.items()], outfile, indent=4)
    print('Json file written')


def rebuild_links(concrete_links_peaces: list) -> list:
    return list(map(lambda peaces: f"http://{peaces[2]}/{'/'.join(peaces[5:])}", concrete_links_peaces))


def split_link(hrefs: list) -> list:
    return list(map(lambda pseudo_link: pseudo_link.split("/"), hrefs))


def filter_papers_links(hrefs: list) -> list:
    concrete_links_peaces = split_link(hrefs)
    concrete_links = rebuild_links(concrete_links_peaces)
    return concrete_links, concrete_links_peaces


def find_all_a_tags_that_matches_pattern(soup, pattern: Pattern[str]):
    return soup.findAll('a', attrs={'href': pattern})


def parse_html(html_page):
    return BeautifulSoup(html_page, "html.parser")


def get_html_from(url: str):
    return urllib.request.urlopen(url)


def main():
    print('Scraping started...')
    html_page = get_html_from("https://github.com/algoritmos-iii/algoritmos-iii.github.io/tree/master/assets/bibliografia")
    soup = parse_html(html_page)
    pattern = re.compile("^/algoritmos-iii/algoritmos-iii.github.io/blob/master/assets/bibliografia/")
    a_tags = find_all_a_tags_that_matches_pattern(soup, pattern)
    print('Links scraped')
    hrefs = [link.get('href') for link in a_tags]
    papers_links, links_peaces = filter_papers_links(hrefs)
    name_link_dict = {links_peaces[i][-1].rstrip(".pdf"):papers_links[i] for i in range(len(papers_links))}
    write_json(on="./assets/bibliography_links.json", data=name_link_dict)


main()