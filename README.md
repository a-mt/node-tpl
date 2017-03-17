# NodeJS Template

Template to start a NodeJS Project.

* 1.0.0  
  Simple Express server
  * `express` server
  * `pug` templating
  * `bootstrap twitter` css

* 2.0.0  
  Handle forms
  * `dotenv` loader of environment variables 
  * `body-parser` post variables handler
  * `express-session` + `connect-flash` flash messages
  * `mongoose` database

* 3.0.0  
  Handle authentication
  * `connect-mongo` persist sessions to database
  * `bcrypt` hash password
  * `passport` authentication middleware + (remove the ones you don't need from package.json) :
    * `passport-local` to support local auth
    * `passport-github` to login via github

## Install

* Clone the repo

      git clone --depth=1 --branch=master git://github.com/a-mt/node-tpl
      cd node-tpl
      rm -drf .git

    __To clone a specific tag__ that is not the last one, use the name of tag instead of `master`.  
    Ex : `git clone --depth=1 --branch=1.0.0 git://github.com/a-mt/node-tpl`

    __Optional__ : Move the content of `node-tpl` to the parent directory

      cd ..
      mv node-tpl/{.*,*} .
      rmdir node-tpl

* Install the project

      npm install

* Start your own project

    * Change details of `package.json`
    * Change details of `README.md`
    * Create a file `.env` containing the required environment variables

          MONGO_URI="mongodb://user:password@host/dbname"

    * For Github auth :  
      - [Create an application](https://github.com/settings/applications/new)

        | Field                      | Value                             |
        |---                         |---                                |
        | Application name           | `Name displayed to the user`      |
        | Description                | `Optional description`            |
        | Homepage URL               | `http://url/`                     |
        | Authorization callback URL | `http://url/auth/github/callback` |

      - Add environment variables to `.env`

            GITHUB_KEY="Client ID"
            GITHUB_SECRET="Client Secret"
            APP_URL="http://url/"