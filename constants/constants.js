export default {
    ErrorCodes: {
        SUCCESS: {
            code: 200
        },
        UNAUTHORIZED: {
            code: 401
        },
        SERVER_BUSY: {
            code: 500
        },
        NO_CONTENT: {
            code: 204
        }
    },
    Events: {
        START: "start",
        FINISH: "finish",
        getEnum: function () {
            let values = [];
            for (let key in this) {
                if (this[key].value && typeof this[key] != "function") values.push(this[key].value)
            }
            return values;
        }
    }
}