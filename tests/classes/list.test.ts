import { List } from '../../src/app/classes/list';

describe('List Class Tests', () => {
    let list: List;

    beforeEach(() => {
        list = new List();
        list.values = [];  // Initializing values as an empty array
    });

    test('add method should correctly add elements', () => {
        list.add("element1");
        list.add("element2");

        expect(list.values).toContain("element1");
        expect(list.values).toContain("element2");
    });

    test('substract method should correctly remove an element', () => {
        list.add("element1");
        list.add("element2");
        list.substract("element1");

        expect(list.values).not.toContain("element1");
        expect(list.values).toContain("element2");
    });

    test('access method should return the correct element at a given index', () => {
        list.add("element1");
        list.add("element2");

        expect(list.access("0")).toBe("element1");
        expect(list.access("1")).toBe("element2");
    });

    test('insert method should add an element at a specific index', () => {
        list.add("element1");
        list.insert(0, "newElement");

        expect(list.access("0")).toBe("newElement");
        expect(list.access("1")).toBe("element1");
        list
    });

    test('print method should return a string representation of the list', () => {
        list.add("element1");
        list.add("element2");

        expect(list.print()).toBe('[element1,element2]');
    });

    test('print method should handle nested collections', () => {
        const nestedList = new List();
        nestedList.values = [];
        nestedList.add("nestedElement1");
        nestedList.add("nestedElement2");

        list.add("element1");
        list.add(nestedList);  // Add nested collection
        list.add("element2");

        expect(list.print()).toBe('[element1,[nestedElement1,nestedElement2],element2]');
    });

    test('clone method should create a deep copy of the list', () => {
        list.add("element1");
        const clone = list.clone();

        expect(clone.access("0")).toBe("element1");
        clone.insert(0, "newElement");
        
        expect(list.access("0")).toBe("element1");  // Original should not change
        expect(clone.access("0")).toBe("newElement");
    });
});
