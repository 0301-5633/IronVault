# Jason DeGroff automated test

import pytest
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_cloud_cli.commands.login import login

from main import dbtest, login_for_access_token



# verifies connection to database is valid
@pytest.mark.asyncio
async def test_Dbconnection():
    key = "MySQL Version"
    db = await dbtest()
    print(f"{db}")
    assert key in db

# confirms that the /api/token route returns a token, and has the correct type
@pytest.mark.asyncio
async def test_AccessToken():
    tokenType = "bearer"
    fusername = "johndoe@example.com"
    fpassword = "secret"
    formdata = OAuth2PasswordRequestForm(grant_type="", username=f"{fusername}", password=f"{fpassword}", scope="")
    response = await login_for_access_token(formdata)
    assert response.token_type == tokenType and response.access_token is not None

