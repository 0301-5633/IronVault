
import logging
import jwt
from typing import Annotated
from datetime import datetime, timedelta, timezone
from pathlib import Path as FilePath
from pydantic import BaseModel
from fastapi import Depends, FastAPI, Path, Query, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from database import MySQLDatabase
from mysql.connector import Error




SECRET_KEY = "4d8fc961715acce78e0208d1ceb1d18ac0a29b2eac8b2ac6b5ded3d3fbf1a80d"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30




class CredentialItem(BaseModel):
    familymemid: str
    category: str
    website: str
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class DeleteRequest(BaseModel):
    entryid: str

class User(BaseModel):
    username: str
    namefirst: str
    namelast: str
    userid: str

class UserInDB(User):
    password: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://localhost:5173",
        "https://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    
def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        verify_password(password, DUMMY_HASH)
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_user_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user





#establishes path of frontend build files for mounting to root route
current_dir = FilePath(__file__).parent
frontend_dir = (current_dir / ".." / ".." / "FrontEnd" / "dist").resolve()


fake_user_db = {"example": {"namefirst": "Example", "namelast": "Test", "password":"$argon2i$v=19$m=4096,t=3,p=1$c29tZXNhbHQ$tomTOMNBNVvpXnQ+/ske78hKBlfnJX+WbWME6ehXC3k","username":"example","userid":"1"},
                 "johndoe@example.com": {"namefirst":"John", "namelast": "Doe", "email": "john@example.com", "password":"$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc","username":"johndoe@example.com","userid":"2"},
                   "ironvault":{"namefirst": "IronVault", "namelast": "Social", "password":"$argon2i$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$21Dohi2iRODFcpsNqh0He3L4Tu13xxAkN/bf3L3mDtQ","username":"ironvault","userid":"3"}
                }
# Had to change username to email for front end purposes tested against johndoe@example.com

fake_user_id_db = {"1":"example","2":"johndoe","3":"ironvault"}

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

@app.post("/api/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    #print(f"Form Data: {form_data.password} {form_data.username}", flush=True) # used to test incoming data
    user = authenticate_user(fake_user_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/id/{entry_id}")
async def read_credential(current_user: Annotated[User, Depends(get_current_user)],entry_id):
    if entry_id in fake_credential_db:
        cred_dict = fake_credential_db[entry_id]
        if cred_dict["userid"] == current_user.userid:
            user_dict = fake_user_db[fake_user_id_db[cred_dict["userid"]]]
            category_dict = fake_category_db[cred_dict["category"]]
            fm_dict = fake_familymembers_db[cred_dict["familymemid"]]
        
                                        
            
            return {"user_id": user_dict["namefirst"] + " " + user_dict["namelast"], 
                    "mem_id" : fm_dict["fmembername"], 
                    "category": category_dict["categoryname"], 
                    "website": cred_dict["website"], 
                    "username": cred_dict["username"],
                    "password": cred_dict["password"] }
        else: raise HTTPException(status_code=403, detail="Access denied")
    else:
        raise HTTPException(status_code=404, detail="Entry not found")   

@app.post("/id/{entry_id}")
async def edit_credential(current_user: Annotated[User, Depends(get_current_user)], entry_id, cred_details:CredentialItem):
    if entry_id in fake_credential_db:
        cred_dict = fake_credential_db[entry_id]
        if cred_dict["userid"] == current_user.userid and current_user.userid != "0":
            if cred_details.familymemid in fake_familymembers_db and cred_details.category in fake_category_db: # Basic validation
                
                cred_dict["familymemid"] = cred_details.familymemid
                cred_dict["category"] = cred_details.category
                cred_dict["website"] = cred_details.website
                cred_dict["username"] = cred_details.username
                cred_dict["password"] = cred_details.password
                return {"item_id": entry_id}
        else: raise HTTPException(status_code=403, detail="Access denied")
    raise HTTPException(status_code=404, detail="Entry not found")        

@app.post("/newid/")
async def new_credential(current_user: Annotated[User, Depends(get_current_user)], cred:CredentialItem):
    if cred.familymemid in fake_familymembers_db and cred.category in fake_category_db: # Basic validation 

        new_cred = {}
        new_cred["userid"] = current_user.userid
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
    else: raise HTTPException(status_code=400, detail="Invalid values")   


@app.post("/deleteid")
async def delete_credential(current_user: Annotated[User, Depends(get_current_user)], delrq: DeleteRequest):
    deleted_cred = {"userid": "0"}
    entry_id = delrq.entryid
    if entry_id in fake_credential_db:
        cred_dict = fake_credential_db[entry_id]
        if current_user.userid == cred_dict["userid"]:   
            fake_credential_db[entry_id] = deleted_cred
            return {"item_id": entry_id}
        else: raise HTTPException(status_code=403, detail="Access denied")
    raise HTTPException(status_code=404, detail="Entry not found") 

@app.post("/listids/")
async def list_credentials(current_user: Annotated[User, Depends(get_current_user)]):
    results_list = []
    for keys in fake_credential_db.keys() :
        current_creds = fake_credential_db[keys]
        if current_user.userid == current_creds["userid"]:
            results_list.append(keys)
    if results_list:
        return{"items": results_list}
    else: return {"items": None}

# Test connection to database and json sending
@app.get("/api/all")
async def dbtest():
    try:
        # Use your custom database context manager
        with MySQLDatabase() as connection:
            with connection.cursor() as cursor:
                # Run your query
                cursor.execute("SELECT * FROM userstbl")
                return cursor.fetchall()
    except Error as e:
        print(f"An error occurred in main: {e}")


# Test connection to database
@app.get("/api/dbtest")
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

#############Must be at bottom of file################
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")