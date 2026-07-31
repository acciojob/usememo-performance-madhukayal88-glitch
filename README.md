# useMemo Performance

Create a todo app where in we have 25 completed tasks and 25 uncompleted tasks. 

App should have 3 buttons:
- On clicking `All` button, it should display all tasks.
- On clicking `Active` button, it should display active tasks only. 
- On clicking `Completed` button, it should display completed tasks only. 

Use this code to artificially slow the rendering:

```
let startTime = performance.now();
 while (performance.now() - startTime < 500) {
   // Do nothing for 500 ms to emulate extremely slow code
 }
```

<ins>**OUTPUT:**</ins>

![OUTPUT](https://storage.googleapis.com/acciojob-open-file-collections/usememo-performance.gif)
