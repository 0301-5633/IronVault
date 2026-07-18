#Testing script for CIS 2619 Part 5 assignment
from fastapi import FastAPI
from fastapi.testclient import TestClient
from .main import app
import pytest
client = TestClient(app)

@pytest.fixture(autouse=True)
def basis_client():
    token_request = client.post("/testtoken")
    valid_token = token_request.json()
    auth_header_value = (f"{valid_token['token_type']} {valid_token['access_token']}")
    client.headers = {"Authorization":auth_header_value}
    print(client.headers)


def test_id_creation_access():

    item = {"familymemid": "1", "category": "1", "website": "www.example.net", "username":"John", "password":"password"} # Both Family Member ID and Category ID resolve to "Example"
    creation_request = client.post("/newid/", json=item)
    assert creation_request.status_code == 200

    created_item = creation_request.json()["item_id"]
    item_access = client.get("/id/" + created_item)
    assert item_access.status_code == 200
    
    assert item_access.json()["category"] == "Example"
    assert item_access.json()["mem_id"] == "Example"
    assert item_access.json()["website"] == "www.example.net"
    assert item_access.json()["username"] == "John"
    assert item_access.json()["password"] == "password"

    
    


def test_list_ids():
    response = client.post("/listids/")
    response_items = response.json()["items"]
    assert "2" in response_items
    assert "4" in response_items
