/* a. a. b c d e. */
export default {
    "a": {"after": [], "count": 2, "token": "a"},
    "b": {"after": [{"c": 1}, {"d": 1}], "count": 1, "token": "b"},
    "b c": {"after": [{"d": 1}, {"e": 1}], "count": 1, "token": "b c"},
    "c": {"after": [{"d": 1}, {"e": 1}], "count": 1, "token": "c"},
    "c d": {"after": [{"e": 1}], "count": 1, "token": "c d"},
    "d": {"after": [{"e": 1}], "count": 1, "token": "d"},
    "d e": {"after": [], "count": 1, "token": "d e"},
    "e": {"after": [], "count": 1, "token": "e"}
};
