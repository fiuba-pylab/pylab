import { Set } from '../../src/app/classes/set';

describe('Set Class Tests', () => {
    let set: Set;

    beforeEach(() => {
        set = new Set();
    });

    test('add method should add unique elements only', () => {
        set.add("element1");
        set.add("element1");
        set.add("element2");

        expect(set.values).toEqual(["element1", "element2"]);
    });

    test('substract method should remove an element', () => {
        set.add("element1");
        set.add("element2");
        set.substract("element1");

        expect(set.values).toEqual(["element2"]);
    });

    test('access method should do nothing (empty implementation)', () => {
        expect(set.access("0")).toBeUndefined();
    });

    test('print method should return a string representation of the set', () => {
        set.add("element1");
        set.add("element2");

        expect(set.print()).toBe('(element1,element2)');
    });

    test('clone method should create a shallow copy of the set', () => {
        set.add("element1");
        const clone = set.clone();

        expect(clone.values).toEqual(["element1"]);
        clone.add("element2");
        
        expect(set.values).toEqual(["element1"]);  // Original should not change
        expect(clone.values).toEqual(["element1", "element2"]);
    });

    test('intersection method should return elements common to all sets', () => {
        set.add("element1");
        set.add("element2");

        const otherSet = new Set();
        otherSet.add("element2");
        otherSet.add("element3");

        const intersection = set.intersection(otherSet);

        expect(intersection.values).toEqual(["element2"]);
    });

    test('difference method should return elements in the original set but not in other sets', () => {
        set.add("element1");
        set.add("element2");

        const otherSet = new Set();
        otherSet.add("element2");
        otherSet.add("element3");

        const difference = set.difference(otherSet);

        expect(difference.values).toEqual(["element1"]);
    });

    test('union method should return a set with all unique elements', () => {
        set.add("element1");
        set.add("element2");

        const otherSet = new Set();
        otherSet.add("element2");
        otherSet.add("element3");

        const unionSet = set.union(otherSet);

        expect(unionSet.values).toEqual(["element1", "element2", "element3"]);
    });

    test('symmetric_difference method should return elements in either set but not both', () => {
        set.add("element1");
        set.add("element2");

        const otherSet = new Set();
        otherSet.add("element2");
        otherSet.add("element3");

        const symDifference = set.symmetric_difference(otherSet);

        expect(symDifference.values).toEqual(["element1", "element3"]);
    });
});
