# Jason DeGroff automated test

import pytest
from main import dbtest

# verifies connection to database is valid
@pytest.mark.asyncio
async def test_dbconnection():
    key = "MySQL Version"
    db = await dbtest()
    print(f"{db}")
    assert key in db


