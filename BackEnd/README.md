# IronVault

IronVault is a full stack password manager that enforces a zero-knowledge policy. Data is hashed on the client side,
encrypted in transport, and then hashed again before storage. 

Note that this project does not include certificates or a reverse proxy. These  would need to be set up in any production environment
to ensure that TLS is in place.


## 🛠️ Prerequisites

Ensure you have the following software installed on your local machine:

\*\*Python 3.10+\*\* (or your preferred version)

\*\*Git\*\*


## 🚀 Getting Started

Follow these step-by-step instructions to set up your local development environment.


### 1. Clone the Repository

Open your terminal and run:

```bash

git clone https://github.com

cd your-repo-name

```


### 2. Create a Virtual Environment

Isolate your dependencies by creating a local virtual environment:

```bash

python -m venv .venv

```


### 3. Activate the Virtual Environment

Activate the environment based on your operating system:

\*\*macOS / Linux:\*\*

```bash

source .venv/bin/activate

```

\*\*Windows (Command Prompt):\*\*

```cmd

.venv\Scripts\activate.bat

```

\*\*Windows (PowerShell):\*\*

```powershell

.venv\Scripts\Activate.ps1

```

\*Visual cue: Your terminal prompt should now show `(.venv)` at the beginning of the line.\*


### 4. Install Dependencies

Install all required project packages tracked in the `requirements.txt` file:

```bash

pip install --upgrade pip

pip install -r requirements.txt

```


## 💻 Development Workflow

To ensure smooth collaboration, please follow these guidelines when adding new features or packages.


### Adding New Packages

If you need to install a new library (e.g., `requests`), run:

```bash

pip install requests

pip freeze > requirements.txt

```

\*Always commit the updated `requirements.txt` file so other team members can pull the changes and update their environments.\*


### Running the App

To run the main application file:
See "Running with HTTPS" for more information

```Windows cmd

cd src
fastapi dev

```


### Running with HTTPS

cert.pem and key.pem required
can generate them with generate_cert.sh
ENSURE THAT "key.pem" IS IN .gitignore *DO NOT SHARE PRIVATE KEY

run.sh
```bash
uvicorn main:app \
    --reload \
    --ssl-keyfile=key.pem \
    --ssl-certfile=cert.pem
```
run.bat
```Windows cmd
uvicorn main:app --reload `
    --ssl-keyfile=key.pem`
    --ssl-certfile=cert.pem`
    --log-level debug
```


### Deactivating the Environment

When you are done working on the project, you can exit the virtual environment by running:

```bash

deactivate

```



