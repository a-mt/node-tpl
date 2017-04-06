# NodeJS Template

Template to start a NodeJS Project.

* sequelize  
  Handle authentication
  * `mysql` database
  * `sequelize` + `sequelize-transforms` ORM
  * `connect-session-sequelize` persist sessions to database
  * `bcrypt` hash password
  * `passport` authentication middleware + (remove the ones you don't need from package.json) :
    * `passport-local` to support local auth
    * `passport-github` to login via github
    * `passport-twitter` to login via twitter

## Install

* Clone the repo

      git clone --depth=1 --branch=sequelize git://github.com/a-mt/node-tpl && cd node-tpl && rm -drf .git

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

          MYSQL_URI="mysql://user:password@host/dbname"

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

    * For Twitter auth :
      - [Create an application](https://apps.twitter.com/)

        | Field                      | Value                              |
        |---                         |---                                 |
        | Name                       | `Name displayed to the user`       |
        | Description                | `Description`                      |
        | Homepage URL               | `http://url/`                      |
        | Authorization callback URL | `http://url/auth/twitter/callback` |

      - Add environment variables to `.env`

            TWITTER_KEY="Consumer Key"
            TWITTER_SECRET="Consumer Secret"
            APP_URL="http://url/"