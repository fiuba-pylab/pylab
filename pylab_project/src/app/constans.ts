const REGEX_RETURN_VARIABLES = /^\s*([a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)\s*=/;
const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_FUNCTIONS = /\b(input|float|int|len|str|math\.\w+)\s*\(([^()]+)\)/g;
const REGEX_PRINT = /print\s*\(\s*(['"]?)(.*?)\1\s*\)/;
const REGEX_RETURN = /^\s*return(?:\s+(.*))?$/;
const REGEX_DEF = /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;

const IF = 'if';
const WHILE = 'while';
const DEF = 'def';
const ELIF = 'elif';

const LEN = 'len';
const STR = 'str';
const INT = 'int';
const FLOAT = 'float';
const MATH_POW = 'math.pow';
const MATH_SQRT = 'math.sqrt';
const MATH_ROUND = 'math.round';
const MATH_ASIN = 'math.asin';
const MATH_LOG10 = 'math.log10';
const PRINT = 'print';
const INPUT = 'input';

export const REGEX_CONSTS = {
    REGEX_DEF, 
    REGEX_RETURN, 
    REGEX_PRINT, 
    REGEX_FUNCTIONS, 
    REGEX_OPERATIONS, 
    REGEX_VARIABLE_DECLARATION, 
    REGEX_RETURN_VARIABLES
};

export const STRUCTURES = {
    IF, 
    WHILE, 
    DEF,
    ELIF
};

export const NATIVE_FUNCTIONS = {
    LEN, 
    STR, 
    INT, 
    FLOAT, 
    MATH_POW, 
    MATH_SQRT, 
    MATH_ROUND, 
    MATH_ASIN, 
    MATH_LOG10, 
    PRINT, 
    INPUT
};
