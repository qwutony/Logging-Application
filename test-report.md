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