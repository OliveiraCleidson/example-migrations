# Example of Migrations

This repository is an example of how to handle migrations using TypeORM. To understand what migrations are and how to use them, read the file [migrations.md](migrations.md).

## Prerequisites

- NodeJS >= 20
- Yarn >= 1.22

## Installation

```bash
# Clone the repository
$ git clone git@github.com:OliveiraCleidson/example-migrations.git

# Enter the folder
$ cd example-migrations

# Install dependencies
$ yarn

# Copy the .env.example file to .env.dev
$ cp .env.example .env.dev

# Set the DB_PATH to the current directory plus db.sqlite
$ echo "DB_PATH=$(pwd)/db.sqlite" >> .env.dev
```

Recommendation: If using VSCode, install an extension to view the SQLite database, such as [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite).

## Migrations

This project is configured to operate with two types of migrations.

### Startup Migration

This type of migration occurs when starting the application. Before the system becomes available for use, a script runs to perform the migration process.

Advantages:
- Ensures that the database is always up-to-date with the source code.

Disadvantages:
- In a horizontally scaled system, multiple instances may try to execute the migration simultaneously, which can cause startup errors and database overload depending on the size of the migration and the number of instances.

### Script Migration

This type of migration is executed through a script that can be run manually. It is important to ensure that the configuration script reflects the same settings as the application. The script will be available in the Docker image and can be triggered when connecting to the container. This approach is useful when working with feature flags, as it allows you to deploy all the new code and then run the migration and change the flag value. It also enables the execution to be externalized to CI/CD pipelines.

Considering that the Dockerfile will remove the files in the src folder and keep only the files necessary for the production environment, the migration script uses the file in the dist folder and not the file in the src folder, so it can only be used after the build.

Advantages:
- Precise control over when migrations are executed.
- Facilitates integration with CI/CD pipelines.
- Reduces the risk of conflicts in horizontally scaled environments.

Disadvantages:
- Requires a manual step or the configuration of automation to execute the migrations.

### Operation

To exemplify these two types of migrations, check the script in the package.json called `migrations:run` for the script migration scenario. For the startup migration scenario, just change the value of the environment variable `MIGRATIONS_RUN_ON_STARTUP` to true and check the code in the `main.ts` file.