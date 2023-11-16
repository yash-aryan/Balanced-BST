# Balanced-BST

In this practice project I created a factory function `Tree()` that **inputs unsorted array of numbers**, and **returns a object containing it's Tree methods**. After inputting array to `Tree()`, it creates a Balanced Binary Search Tree and returns useful methods to alter that BST in an object.

After calling the factory `Tree` and passing an array as parament, `Tree` calls some private functions to a build the BST. Firstly it calls `mergesortArray()` to sort the input array; **time complexity O(N log N)**. Then it calls the function `buildTree()` to recursively assign the left and right nodes to each node (null if none), and returns the root node; **time complexity O(N)**.

## Get Started

-   Open the developer console (F12).
-   To use this binary search tree, create an object instance using the `Tree` factory function as following:

```
> const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
> myTree

// OUTPUT
> {
    rootNode,
    prettyPrint,
    find,
    insert,
    remove,
    levelOrder,
    levelOrderRecursion,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
}
```

## Tree Methods

-   `rootNode` returns the current root node in the tree.
-   `prettyPrint(rootNode)` is **NOT CREATED BY ME**, and was given in the course to just display a nice visual represantation of the Balanced BST in console based on the root node.
-   `find(value)` returns the node object of the input value; **time complexity O(log N)**.
-   `insert(value)` inserts a node of input value into the tree; **time complexity O(log N)**.
-   `remove(value)` remove a node of input value from the tree; **time complexity O(log N)**.
-   `levelOrder(callback fn)` & `levelOrderRecursion(callback fn)` to call each node in breadth-first order as the parameter for the callback function. If no callback function is given, then it returns an array in Breadth-first order. Both functions do the same job but in different approach; **time complexity O(N)**.
-   `inorder(callback fn)` same as above but inorder Depth-first traversal. If no callback function is given, then it returns an array inorder DFS; **time complexity O(N)**.
-   `preorder(callback fn)` same as above but preorder Depth-first traversal. If no callback function is given, then it returns an array preorder DFS; **time complexity O(N)**.
-   `postorder(callback fn)` same as above but postorder Depth-first traversal. If no callback function is given, then it returns an array postorder DFS; **time complexity O(N)**.
-   `height(node)` returns the height of the node in the tree; **time complexity O(N)**.
-   `depth(node)` returns the depth of the node in the tree; **time complexity O(N)**.
-   `isBalanced()` returns boolean after checking if the tree is balanced binary search tree or not; **time complexity O(N)**.
-   `rebalance()` balances the tree if it is NOT balanced already; **time complexity O(N)**.

## Project Status

-   [x] Remove duplicate elements from the input array.
-   [x] Sort the input array.
-   [x] Create the core buildTree function to create a Balanced BST.
-   [x] Create function to insert & delete a node with a big O(log n) time complexity.
-   [x] Create a find function to returns the node object of the input value.
-   [x] Create a levelOrder function to that inputs a callback function and uses each node in breadth-first order as the parameter for the callback function. If no callback function is given, then it returns an array in Breadth-first order.
-   [x] Similarly, create inorder, pre-order, post-order functions.
-   [x] Create a function called "height", which inputs a node and returns it's height number from the root node.
-   [x] Similarly create a function called "depth".
-   [x] Create a function called "isBalanced".
-   [x] Create a function called "rebalance".
