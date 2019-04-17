#Test-Report

**Purpose of Testing**

The reason for testing an application is multi-faceted. In software development, there are common occurrences of coding errors, otherwise known as bugs. These bugs are frequent in coding and thus regular and stricting testing is necessary to ensure that the code is working up to standard.

Since the creation of the application is for commercial use and likely be adopted by a company, the product should be as clean from bugs and errors as possible, as a failure to meet these standards will damage the reputation and financial capabilities of the software development company.

Testing is essential because it raises the product to reach the minimum specifications that all programs are required to have, that is, to be functional for a user, to be secure and non-exploitable, and to be convenient and efficient for the user. Thus, we are testing this logging application to ensure that it will be used in a way that it is intended to be used.

**Scope of Testing**

In this application we have decided to concentrate the testing on two segments of the application, namely the creation of two class variables:
    BST: Binary Search Tree; and
    queue: Doubly Linked List

Since the code base of these javascript files are not as large as the main javascript application, app.js, it can be said that the amount of code being tested is only about a quarter.

**Standard and Methodology of Testing**

*Standards*: Since these tests are relatively black and white, and so can either assume success or failure, in order for the application to work there must be a 100% success rate on these tests. If any tests fail, it is likely that the data structure will not work, causing the application to be unable to store data to an adequate extent.

*Methodology*: Since these tests only occur within a single javascript file, it is unlikely to be integration, performance or end-to-end testing. Instead, these tests are concerned with how each individual component operates, and thus should be classified as unit testing. The objective is to determine whether each line of code succeeds in what it was intended to do.

**Test Outline**

The test to be implemented will be using Jest as the Javascript Testing Framework (https://jestjs.io/). The following code contains three separate tests of code:

```javascript

// First Test: Unit testing to confirm that each key-value pairing of the Binary Search Tree is working as expected. This is to determine if the initialisation of the BST will return null, which indicates that there is no corresponding value of a key that doesn't exist.
describe("test the lookup method in trivial trees", () => {

    const t = new BST();

    test("lookup in empty list should return null", () => {
        expect(t.lookup("groot")).toBe(null);
        expect(t.lookup(5)).toBe(null);
    });

    test("lookup in a list with one entry", () => {
        t.insert('groot', 55);
        expect(t.lookup("groot")).toBe(55);
        expect(t.lookup(5)).toBe(null);
    });

});


// Second Test: Determine if the add and lookup methods within the Binary Search Tree class is successfully implemented, by firstly testing if adding to the tree will return a valid result, then pressure testing to see if the code can withstand a large number of new inputs.
describe("test add and lookup methods", () => {

    const t = new BST();

    const toAdd = [50, 25, 12,6,37,31,75,66,89,95];
    for (let i = 0; i < toAdd.length; i++) {
        t.insert(toAdd[i], 'test ' + toAdd[i]);
    }
    test("lookup existent and non-existent entries in bst", () => {
        for (let i = 0; i < 100; i++) {
            if (toAdd.indexOf(i) === -1) {
                expect(t.lookup(i)).toBe(null);
            } else {
                expect(t.lookup(i)).toBe('test ' + i);
            }
        }
    });
});

// Third Test: This test determines if querying a range of values that do not exist will not return a value, and thus return only an empty array ([]).
describe("range queries with no results", () => {

    test("range query of empty tree", () => {
        const t = new BST();

        expect(t.range(0, 50)).toEqual([]);
        expect(t.range('myrange', 'z')).toEqual([]);
    });

    test("ranges with empty results", () => {
        const t = new BST();

        t.insert('myki', '$3.50');
        t.insert(0, 'xyz');
        t.insert(-1, 'abc');
        t.insert(10, 'def');
        t.insert(-10, 'defg');

        // must be empty no matter what is in BST
        expect(t.range(0, -1)).toEqual([]);
        expect(t.range(0, -1)).toEqual([]);

        // will be empty in this case
        expect(t.range('m', 'mx')).toEqual([]);

    });
});
```

