/* a penny saved is a penny earned. */
export default {
    "a": {
        "after": [{ "penny": 2}, { "earned": 1, "saved": 1}],
        "count": 2,
        "token": "a"
    },
    "a penny": {
        "after": [{ "earned": 1, "saved": 1}, { "is": 1}],
        "count": 2,
        "token": "a penny"
    },
    "earned": {
        "after": [],
        "count": 1,
        "token": "earned"
    },
    "is": {
        "after": [{ "a": 1}, { "penny": 1}],
        "count": 1,
        "token": "is"
    },
    "is a": {
        "after": [{ "penny": 1}, { "earned": 1}],
        "count": 1,
        "token": "is a"
    },
    "penny": {
        "after": [{ "earned": 1, "saved": 1}, { "is": 1}],
        "count": 2,
        "token": "penny"
    },
    "penny earned": {
        "after": [],
        "count": 1,
        "token": "penny earned"
    },
    "penny saved": {
        "after": [{ "is": 1}, { "a": 1}],
        "count": 1,
        "token": "penny saved"
    },
    "saved": {
        "after": [{ "is": 1}, { "a": 1}],
        "count": 1,
        "token": "saved"
    },
    "saved is": {
        "after": [{ "a": 1}, { "penny": 1}],
        "count": 1,
        "token": "saved is"
    }
};