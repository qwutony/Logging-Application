#Test-results

(T2.3)The results of tests as shown below indicate that all the test suites have passed without fail:
```
PASS ./bst.test.js
PASS ./queue.test.js

Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        3.521s
Ran all test suites.
```

From my evaluation, these tests are successful in determining the defects within the specific data structures of the application. This is because the tests focus on a wide range of results, including standard numerical tests such as negatives and zero, stress tests to determine the maximal capabilities of the application.

Since the application was created under test-driven development, if there was a defect that was detected from testing or debugging, the best solution would be to create more tests that expect certain values that can solve the defect, and then adjust the application until the test succeeds.