# will generate certs for https
# a reverse proxy would be needed for production
# cert.pem    # public certificate
# key.pem     # private key add to .gitignore
# Several prompts for data, most not needed for dev environment
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes