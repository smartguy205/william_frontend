export const words = [
    "the",
    "be",
    "of",
    "and",
    "a",
    "to",
    "in",
    "he",
    "have",
    "it",
    "that",
    "for",
    "they",
    "I",
    "with",
    "as",
    "not",
    "on",
    "she",
    "at",
    "by",
    "this",
    "we",
    "you",
    "do",
    "but",
    "from",
    "or",
    "which",
    "one",
    "would",
    "all",
    "will",
    "there",
    "say",
    "who",
    "make",
    "when",
    "can",
    "more",
    "if",
    "no",
    "man",
    "out",
    "other",
    "so",
    "what",
    "time",
    "up",
    "go",
    "about",
    "than",
    "into",
    "could",
    "state",
    "only",
    "new",
    "year",
    "some",
    "take",
    "come",
    "these",
    "know",
    "see",
    "use",
    "get",
    "like",
    "then",
    "first",
    "any",
    "work",
    "now",
    "may",
    "such",
    "give",
    "over",
    "think",
    "most",
    "even",
    "find",
    "day",
    "also",
    "after",
    "way",
    "many",
    "must",
    "look",
    "before",
    "great",
    "back",
    "through",
    "long",
    "where",
    "much",
    "should",
    "well",
    "people",
    "down",
    "own",
    "just",
    "because",
    "good",
    "each",
    "those",
    "feel",
    "seem",
    "how",
    "high",
    "too",
    "place",
    "little",
    "world",
    "very",
    "still",
    "nation",
    "hand",
    "old",
    "life",
    "tell",
    "write",
    "become",
    "here",
    "show",
    "house",
    "both",
    "between",
    "need",
    "mean",
    "call",
    "develop",
    "under",
    "last",
    "right",
    "move",
    "thing",
    "general",
    "school",
    "never",
    "same",
    "another",
    "begin",
    "while",
    "number",
    "part",
    "turn",
    "real",
    "leave",
    "might",
    "want",
    "point",
    "form",
    "off",
    "child",
    "few",
    "small",
    "since",
    "against",
    "ask",
    "late",
    "home",
    "interest",
    "large",
    "person",
    "end",
    "open",
    "public",
    "follow",
    "during",
    "present",
    "without",
    "gain",
    "hold",
    "govern",
    "around",
    "possible",
    "head",
    "consider",
    "word",
    "program",
    "problem",
    "owever",
    "lead",
    "system",
    "set",
    "order",
    "eye",
    "plan",
    "run",
    "keep",
    "face",
    "act",
    "group",
    "play",
    "stand",
    "increase",
    "early",
    "course",
    "change",
    "help",
    "line",
];

let quotes_array = [
    "Push yourself, because no one else is going to do it for you ",
    "water away good want over going where would took school think home know bear again ",
    "Failure is the condiment that gives success its flavor magic shouted other food through been stop must door right ",
    "Wake up with determination. Go to bed with satisfaction know bear again long things after wanted eat ",
    "It's going to be hard, but hard does not mean impossible  good want over going where would took school think ",
    "Learning never exhausts the mind  must door right these began animals next first work ",
    "The only way to do great work is to love what you do  baby fish mouse something ",
    "The clouds formed beautiful animals in the sky that eventually created a tornado to wreak havoc. ",
    "The shark-infested South Pine channel was the only way in or out. He was an introvert that extroverts seemed to love.",
    "I'm worried by the fact that my daughter looks to the local carpet seller as a role model.",
];
const getWords = () => `water away good want over going where would took school think home 
know bear again long things after wanted eat everyone play thought well find more 
round tree magic shouted other food through been stop must door right these began 
animals next first work baby fish mouse something`.toLowerCase().split(' ').sort(() => Math.random() > 0.5 ? 1 : -1);