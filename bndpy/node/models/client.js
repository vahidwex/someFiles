const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
const jwt = require('jsonwebtoken')

let Schema = new mongoose.Schema({
    name:{ type: String, require: true },
    family:{ type: String, require: true },
    mobile:{ type: String, require: true },
    address:{ type: String, require: true },
    postalCode:{ type: String, require: true },
    token: {type: String,default:""}
    
});


Schema.methods.generateAuthToken = async function () {
    const client = this
    

    const token = jwt.sign({ id: client._id.toHexString() }, process.env.SECRET_KEY)
                  
    client.token = client.token.concat( token )
    await client.save()

    return token
}

module.exports = mongoose.model("Client", Schema);