
#NODE_ENV=production DEBUG_SITE=true DEBUG_MAIN=true DEBUG_CRAWL=true  phantomjs --web-security=false --ssl-protocol=tlsv1 --ignore-ssl-errors=true serve.js 60000

export NODE_ENV=development DEBUG_SITE=true DEBUG_MAIN=true DEBUG_CRAWL=true  LOGONLY=true 
./start.sh

#phantomjs --web-security=false --ssl-protocol=tlsv1 --ignore-ssl-errors=true serve.js 60000

