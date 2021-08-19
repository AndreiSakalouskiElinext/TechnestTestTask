## TechnestTestTask

In this task only api calls are used due to their efficiency compared to UI tests.
For example a page displays only 10 articles, while the task requires 11 ones (I suppose that's also a hint :) ), so I got rid of redundant complexity.

Also, I suppressed one warning under getAllArticlesWithApi function because it requires to return a promise explicitly while cypress says its functions return promises, so that it's not necessary to wrap them by other promises.
