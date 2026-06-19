from typing import Annotated
from pathlib import Path as FilePath
from pydantic import BaseModel
from fastapi import FastAPI, Path, Query
from fastapi.staticfiles import StaticFiles
from database import MySQLDatabase
from mysql.connector import Error


class ListRequest(BaseModel):
    userid: str # Should be replaced in the actual app with real user authentication, but this approximates the same thing (listing entries only belonging to one user)


class CredentialItem(BaseModel):
    userid: str
    familymemid: str
    category: str
    website: str
    username: str
    password: str

app = FastAPI()

#establishes path of frontend build files for mounting to root route
current_dir = FilePath(__file__).parent
frontend_dir = (current_dir / ".." / ".." / "FrontEnd" / "dist").resolve()


fake_user_db = {"1": {"namefirst": "Example", "namelast": "Test"},
                 "2": {"namefirst":"John", "namelast": "Doe"}, "3":
                   {"namefirst": "IronVault", "namelast": "Social"}}

fake_category_db = {"0": {"categoryname": "None"}, "1": {"categoryname": "Example"}, "2": {"categoryname": "Social Media"}}


fake_familymembers_db = {"0": {"fmembername": "None"}, "1": {"fmembername": "Example"}, "2": {"fmembername": "Roberts"}, "3": {"fmembername": "Blackhat"}}

fake_credential_db = {
    "1": {
        "userid" : "1",
        "familymemid" : "0",
        "category" : "1",
        "website": "www.example.com",
        "username" : "example",
        "password" : "abc123"
    }, 
        "2": {
        "userid" : "2",
        "familymemid" : "3",
        "category" : "0",
        "website": "www.google.com",
        "username" : "john.doe",
        "password" : "p@ssw0rd"
    }, 
            "3": {
        "userid" : "3",
        "familymemid" : "1",
        "category" : "2",
        "website": "www.x.com",
        "username" : "IronVault",
        "password" : "CPXjifgvUFBz"
    }
}



@app.get("/dbtest")
async def dbtest():
    try:
        # Use your custom database context manager
        with MySQLDatabase() as connection:
            with connection.cursor() as cursor:
                # Run your query
                cursor.execute("SELECT VERSION();")
                version = cursor.fetchone()
                return{f"Hello World": "TEST", f"MySQL Version" : f"{version[0]}"}

    except Error as e:
        print(f"An error occurred in main: {e}")


@app.get("/id/{entry_id}")
async def read_credential(entry_id):
    if entry_id in fake_credential_db:
        cred_dict = fake_credential_db[entry_id]
        user_dict = fake_user_db[cred_dict["userid"]]
        category_dict = fake_category_db[cred_dict["category"]]
        fm_dict = fake_familymembers_db[cred_dict["familymemid"]]
    
                                        
        
        return {"user_id": user_dict["namefirst"] + " " + user_dict["namelast"], 
                "mem_id" : fm_dict["fmembername"], 
                "category": category_dict["categoryname"], 
                "website": cred_dict["website"], 
                "username": cred_dict["username"],
                "password": cred_dict["password"] }
    else:
        return None 


@app.post("/newid/")
async def new_credential(cred:CredentialItem):
    if cred.userid in fake_user_db and cred.familymemid in fake_familymembers_db and cred.category in fake_category_db: # Basic validation 

        new_cred = {}
        new_cred["userid"] = cred.userid
        new_cred["familymemid"] = cred.familymemid
        new_cred["category"] = cred.category
        new_cred["website"] = cred.website
        new_cred["username"] = cred.username
        new_cred["password"] = cred.password

        #These two lines aren't necessary in an actual database with autoincrementing entries, but it's necessary for the fake DB
        currentlast = list(fake_credential_db)[-1]
        crednewid = str(int(currentlast) + 1)

        new_cred_item = fake_credential_db[crednewid] = new_cred
        return {"item_id": crednewid}
    else: return {"item_id": None}
    


@app.post("/listids/")
async def list_credentials(listrq: ListRequest):
    results_list = []
    for keys in fake_credential_db.keys() :
        current_creds = fake_credential_db[keys]
        if listrq.userid == current_creds["userid"]:
            results_list.append(keys)
    if results_list:
        return{"items": results_list}
    else: return {"items": None}

#############Must be at bottom of file################
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")