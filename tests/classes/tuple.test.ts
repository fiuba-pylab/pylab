import { Tuple } from '../../src/app/classes/tuple';

describe('Tuple Class Tests', () => {
    let tuple: Tuple;

    beforeEach(() => {
        tuple = new Tuple();
        tuple.values = [];  // Initialize with an empty array
    });

    test('add method should add elements to the tuple', () => {
        tuple.add("element1");
        tuple.add("element2");

        expect(tuple.values).toEqual(["element1", "element2"]);
    });

    test('access method should return the correct element at a given index', () => {
        tuple.add("element1");
        tuple.add("element2");

        expect(tuple.access("0")).toBe("element1");
        expect(tuple.access("1")).toBe("element2");
    });

    test('print method should return a string representation of the tuple', () => {
        tuple.add("element1");
        tuple.add("element2");

        expect(tuple.print()).toBe('(element1,element2)');
    });

    test('clone method should create a deep copy of the tuple', () => {
        tuple.add("element1");
        const clone = tuple.clone();

        expect(clone.values).toEqual(["element1"]);
        clone.add("element2");

        expect(tuple.values).toEqual(["element1"]);  // Original should remain unchanged
        expect(clone.values).toEqual(["element1", "element2"]);
    });

    test('substract method should be defined but do nothing (empty implementation)', () => {
        tuple.add("element1");
        tuple.substract("element1");

        expect(tuple.values).toContain("element1");  // No removal expected
    });
});
