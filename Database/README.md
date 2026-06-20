# IronVault Database

This directory contains the database resources for the IronVault Password Manager project.

## Contents

| File            | Description                                            |
| --------------- | ------------------------------------------------------ |
| `IronVault.mwb` | MySQL Workbench data model used to design the database |
| `schema.sql`    | SQL script used to create the database schema          |
| `README.md`     | Database setup instructions                            |

---

# Prerequisites

Before building the database, ensure the following software is installed:

* MySQL Server 8.0+
* MySQL Workbench 8.0+

Verify that the MySQL service is running before proceeding.

---

# Database Creation

## 1. Create the Database

Connect to MySQL as an administrative user and create the database:

```sql
CREATE DATABASE ironvault;
```

Alternatively, connect through the MySQL command line:

```bash
mysql -u root -p
```

Then execute:

```sql
CREATE DATABASE ironvault;
EXIT;
```

---

## 2. Import the Schema

Execute the schema file against the newly created database.

### Using MySQL Command Line

```bash
mysql -u root -p ironvault < schema.sql
```

### Using MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your MySQL instance.
3. Select **File → Open SQL Script**.
4. Open `schema.sql`.
5. Set the default schema to `ironvault`.
6. Execute the script.

---

## 3. Verify Installation

Confirm that all tables were created successfully:

```sql
USE ironvault;

SHOW TABLES;
```

Expected tables include:

```text
users
passwords
categories
family_members
```

> Update this list as the schema evolves.

---

# API Database User

For security reasons, the application should never connect using the MySQL root account.

Create a dedicated API user:

```sql
CREATE USER 'ironvault_api'@'localhost'
IDENTIFIED BY 'change_this_password';
```

Grant only the permissions required by the application:

```sql
GRANT
SELECT,
INSERT,
UPDATE,
DELETE
ON ironvault.*
TO 'ironvault_api'@'localhost';
```

Apply the changes:

```sql
FLUSH PRIVILEGES;
```

Verify the assigned permissions:

```sql
SHOW GRANTS FOR 'ironvault_api'@'localhost';
```

---

# Updating the Database Model

The MySQL Workbench model (`.mwb`) is considered the authoritative source for database design.

When making schema changes:

1. Open the MySQL Workbench model.
2. Modify the database design.
3. Forward Engineer the model or regenerate `schema.sql`.
4. Commit both:

   * Updated `.mwb` file
   * Updated `schema.sql`

Both files should always remain synchronized.

---

# Development Notes

* Do not store production credentials in source control.
* Use environment variables or configuration files for database connection settings.
* The MySQL Workbench model is the authoritative design document.
* The generated `schema.sql` file is the authoritative deployment artifact.
* All schema modifications should be performed in the Workbench model first and then exported to `schema.sql`.

---

# Troubleshooting

### Access Denied Errors

Verify that:

* MySQL Server is running.
* The specified user exists.
* The user has been granted appropriate privileges.
* The correct password is being used.

### Schema Import Errors

Verify that:

* The `ironvault` database exists before importing.
* The schema file was generated from the latest Workbench model.
* The user executing the import has sufficient permissions.

### Missing Tables

If expected tables are not present:

```sql
SHOW TABLES;
```

Re-import the schema and review any errors generated during execution.

---

# Version Control

The following files should be committed to the repository:

```text
database/
├── IronVault.mwb
├── schema.sql
└── README.md
```

Database changes should be committed together with any corresponding application code changes to ensure compatibility across project components.
