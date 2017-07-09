/* a b c. a b d. b e. b e. b e. b e. */
export default {
    "a": {"after": [{"b": 2}, {"c": 1, "d": 1}], "count": 2, "token": "a"},
    "a b": {"after": [{"c": 1, "d": 1}], "count": 2, "token": "a b"},
    "b": {"after": [{"c": 1, "d": 1, "e": 4}], "count": 6, "token": "b"},
    "b c": {"after": [], "count": 1, "token": "b c"},
    "b d": {"after": [], "count": 1, "token": "b d"},
    "b e": {"after": [], "count": 4, "token": "b e"},
    "c": {"after": [], "count": 1, "token": "c"},
    "d": {"after": [], "count": 1, "token": "d"},
    "e": {"after": [], "count": 4, "token": "e"}
};