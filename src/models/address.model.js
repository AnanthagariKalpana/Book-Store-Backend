

import { Schema, model } from "mongoose";

const addressSchema = Schema({
    userId: {
        type: String
    },
    address:
        [
            {
                fullName: {
                    type: String
                },
                mobileNumder: {
                    type: Number
                },
                address: {
                    type: String
                },
                city: {
                    type: String
                },
                state: {
                    type: String
                },
                type: {
                    type: String
                }
            }]
})

export default model('Address', addressSchema);