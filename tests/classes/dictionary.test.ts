import { Dictionary } from '../../src/app/classes/dictionary';

describe('Dictionary Class Tests', () => {
    let dictionary: Dictionary;

    beforeEach(() => {
        dictionary = new Dictionary();
    });

    test('add method should correctly add elements', () => {
        dictionary.add("key1: value1");
        dictionary.add("key2: value2");

        expect(dictionary.access("key1")).toBe("value1");
        expect(dictionary.access("key2")).toBe("value2");
    });

    test('add method should handle invalid format gracefully', () => {
        dictionary.add("invalidValue");
        expect(dictionary.access("invalidValue")).toBeUndefined();
    });

    test('insert method should add elements with a specific index', () => {
        dictionary.insert("customKey", "customValue");

        expect(dictionary.access("customKey")).toBe("customValue");
    });
    
    test('access method should return the correct value', () => {
        dictionary.insert("key1", "value1");

        expect(dictionary.access("key1")).toBe("value1");
    });

    test('print method should return a JSON string of values', () => {
        dictionary.add("key1: value1");
        dictionary.add("key2: value2");

        const printedValues = dictionary.print();
        expect(printedValues).toBe('{"key1":"value1","key2":"value2"}');
    });

    test('in method should check if an element exists', () => {
        dictionary.add("key1: value1");

        expect(dictionary.in("key1")).toBe(true);
        expect(dictionary.in("key2")).toBe(false);
    });

    test('clone method should create a deep copy of the dictionary', () => {
        dictionary.add("key1: value1");
        const clone = dictionary.clone();

        expect(clone.access("key1")).toBe("value1");
        
        dictionary.insert("key2", "value2");
        expect(clone.access("key2")).toBeUndefined(); // clone should not have key2
    });
});
