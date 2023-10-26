# Balanced-BST
In this practice project I created a factory function that inputs unsorted array of numbers, and returns the root node object. This root node object is the root node of a balanced binary search tree created using the input array.

- Unsorted array gets inputted to mergesort function, where I also remove the duplicates in the process, keeping only 1 of each value in the array.
- The mergesort function here returns a sorted array without duplicates, which is then inputted to Tree function, which recursively creates a Balanced Binary Search Tree (Balanced BST) and return the root node.
- The prettyprint function is NOT MINE, and was given in the course to just display a nice visual represantation of the Balanced BST in console based on the root node.

# Project Status
- [x] Remove duplicate elements from the input array.
- [x] Sort the input array.
- [x] Create the core buildTree function to create a Balanced BST.
- [x] Create function to insert & delete a node with a big O(log n) time complexity.
- [x] Create a find function to returns the node object of the input value.
- [x] Create a levelOrder function to that inputs a callback function and uses each node in breadth-first order as the parameter for the callback function. If no callback function is given, then it returns an array in Breadth-first order.
- [ ] Similarly, create inorder, pre-order, post-order functions.
- [ ] Create a function called "height", which inputs a node and returns it's height number from the root node.
- [ ] Similarly create a function called "depth".
- [ ] Create a function called "isBalanced".
- [ ] Create a function called "rebalance".