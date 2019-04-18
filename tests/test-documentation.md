#Test-documentation

This test documentation aims to annotate the Test.PNG file to explain the test procedures.

Test Procedure (as shown in the first terminal command in test.PNG):

1. Navigate to the `tests` folder in the repository.
2. Execute the `test.sh` script using `./test.sh`.
3. This should create a new file beginning with 'test_' and the timestamp afterwards.
4. Open the file using `cat [filename]` to examine the results of the test.

To determine the success or failure of the test, after using `cat` on the output file, it should reveal whether the test passed or not. If there are failed tests, it will indicate the error, and specify which tests and which test suites have passed or failed. This can also be demonstrated in terminal using `npm test`.