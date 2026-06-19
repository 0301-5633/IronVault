from typing import Annotated
from pydantic import BaseModel
from fastapi import FastAPI, Path, Query

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
        "12": {
        "userid" : "2",
        "familymemid" : "3",
        "category" : "0",
        "website": "www.google.com",
        "username" : "john.doe",
        "password" : "p@ssw0rd"
    }, 
            "34": {
        "userid" : "3",
        "familymemid" : "1",
        "category" : "2",
        "website": "www.x.com",
        "username" : "IronVault",
        "password" : "CPXjifgvUFBz"
    }
}


@app.get("/")
async def root():
    return {"message": "Hello World"}

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


#@app.post("/newid/")

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

            

     
