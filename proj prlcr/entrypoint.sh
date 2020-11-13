#!/bin/bash

cat >/var/www/env.js <<EOL
    var PAYMENT_KEY = $PAYMENT_KEY;
    if (typeof localStorage === "undefined" || localStorage === null) {
        let LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
EOL

cat >/var/www/dist/browser/env.js <<EOL
    var PAYMENT_KEY = $PAYMENT_KEY;
EOL
cd /var/www && cat env.js dist/server.js > server.js.tmp
mv /var/www/server.js.tmp /var/www/dist/server.js
#remove File
rm -rf .git Dockerfile docker-compose* build* angular.json

# Run optimize bundle and set statics script
bash /after_build.sh

# Start server with pm2
#pm2 start -i $NODE_INSTANCE -u www-data --no-daemon dist/server.js
pm2 start -i $NODE_INSTANCE --no-daemon dist/server.js

# Give permission to log file
ls /var/www/dist/logs || mkdir /var/www/dist/logs
chmod 777 /var/www/dist/logs/access.log
