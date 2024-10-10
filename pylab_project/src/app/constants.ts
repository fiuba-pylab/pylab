const REGEX_RETURN_VARIABLES = /^\s*([a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)\s*=/;
const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_FUNCTIONS = /\b(input|float|int|len|str|math\.\w+)\s*\(([^()]+)\)/g;
const REGEX_PRINT = /print\s*\(\s*(['"]?)(.*?)\1\s*\)/;
const REGEX_RETURN = /^\s*return(?:\s+(.*))?$/;
const REGEX_DEF = /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;
const REGEX_NAMED_PARAMS = /^\s*(\w+)\s*=\s*([\w\s+\-*/]+)\s*$/;
const REGEX_LIST = /^\[[^\]]*\]$/;
const REGGEX_SET = /^\{[^}]+\}$/;
const REGGEX_TUPLE = /^\( *(?:[^(),]+|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\([^()]*\|[ \t\n\r]*|(?:,\s*)?)*\) *$/;
const REGGEX_DICTIONARY = /^\{(\s*".+?"\s*:\s*".+?"\s*(,\s*".+?"\s*:\s*".+?"\s*)*)?\}$/
const REGEX_COLLECTION_ADD = /^(\w+)\.(append|add)\((.+?)\)$|^(\w+)\s*(\+)\s*\((.+?)\)$/;
const REGEX_COLLECTION_SUBSTRACT = /^(\w+)\.(remove|discard)\((.+?)\)$/
const REGEX_COLLECTION_ACCESS = /^(\w+)\[(.+?)\]$/;
const REGEX_FOR = /[a-zA-Z_]\w*\s+in\s+[a-zA-Z_]\w*/;
const REGEX_IN_OPERATION = /^(\d+)\s+in\s+\{(\s*\d+\s*(,\s*\d+\s*)*)\}$/;
const IMAGINARY = /[-+]? ?\d*\.?\d+i/
const REAL = /[-+]? ?\d*\.?\d+ ?[-+]/

const IF = 'if';
const WHILE = 'while';
const DEF = 'def';
const ELIF = 'elif';
const FOR = 'for'

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

const validAddOperators = ['append', 'add'];
const validSubstractOperators = ['remove', 'discard'];

export const REGEX_CONSTS = {
    REGEX_DEF, 
    REGEX_RETURN, 
    REGEX_PRINT, 
    REGEX_FUNCTIONS, 
    REGEX_OPERATIONS, 
    REGEX_VARIABLE_DECLARATION, 
    REGEX_RETURN_VARIABLES,
    REGEX_NAMED_PARAMS,
    REGEX_LIST,
    REGGEX_SET,
    REGGEX_TUPLE,
    REGEX_COLLECTION_ADD,
    REGEX_COLLECTION_SUBSTRACT,
    REGEX_COLLECTION_ACCESS,
    REGGEX_DICTIONARY,
    REGEX_FOR,
    REGEX_IN_OPERATION,
    IMAGINARY,
    REAL
};

export const STRUCTURES = {
    IF, 
    WHILE, 
    DEF,
    ELIF,
    FOR
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
    INPUT,
};

export const VALID_OPERATORS = {
    validAddOperators,
    validSubstractOperators
}
