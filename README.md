# NodeJS Template

Template to start a NodeJS Project.

* 1.0.0
  * `express` server
  * `pug` templating
  * `bootstrap twitter` css

* 2.0.0
  * `dotenv` loader of environment variables 
  * `body-parser` post variables handler
  * `express-session` + `connect-flash` flash messages
  * `mongoose` database

## Install

* Clone the repo

      git clone --depth=1 --branch=master git://github.com/a-mt/node-tpl
      cd node-tpl
      rm -drf .git

    __To clone an older tag__, use the name of tag instead of `master`.  
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