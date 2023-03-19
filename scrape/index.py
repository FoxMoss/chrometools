from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
import json
import os
import re

## settings

target = "devtools://devtools/bundled/devtools_app.html" # page to scrape
prefix = "devtools://devtools/bundled/" # with trailing slash



service = Service(executable_path="/bin/chromedriver")

caps = DesiredCapabilities.CHROME
caps['goog:loggingPrefs'] = {'performance': 'ALL'}
driver = webdriver.Chrome(desired_capabilities=caps)
driver.get("devtools://devtools/bundled/devtools_app.html")


input("All loaded?")

def process_browser_log_entry(entry):
    response = json.loads(entry['message'])['message']
    return response

browser_log = driver.get_log('performance') 
events = [process_browser_log_entry(entry) for entry in browser_log]
events = [event for event in events if 'Network.response' in event['method']]

for x in events:
    if(x["params"]["response"]["url"].startswith(prefix)):
        print(x["params"]["response"]["url"])
        save_url = x["params"]["response"]["url"].replace(prefix, "")
        matches = re.findall(r"^(.+)\/([^\/]+)$", save_url, re.MULTILINE)
        
        save_folder = ""
        if(len(matches) > 0):
            save_folder = matches[0][0]
            if not os.path.exists('./out/'+save_folder):
                os.makedirs('./out/'+save_folder)
        file = open('./out/'+save_url, 'w')
        file.write(driver.execute_cdp_cmd('Network.getResponseBody', {'requestId': x["params"]["requestId"]})["body"])
        file.close()
    

#print(driver.execute_cdp_cmd('Network.getResponseBody', {'requestId': events[0]["params"]["requestId"]}))
