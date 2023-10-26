'use strict';

function Tree(inputArr = null) {
	if (!inputArr || !Array.isArray(inputArr)) return;

	const sortedArr = mergesortArray(inputArr);
	const rootNode = buildTree(sortedArr, 0, sortedArr.length - 1);

	function prettyPrint(node = rootNode, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
		if (node.left !== null) {
			prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	function find(target, midNode = rootNode) {
		if (!midNode || midNode.value === null) return false;
		if (target === midNode.value) return midNode;
		if (target < midNode.value) return find(target, midNode.left);
		if (target > midNode.value) return find(target, midNode.right);
	}

	function insert(target) {
		const targetNode = Node(target);
		insertLeafNode(rootNode);
		prettyPrint();

		function insertLeafNode(midNode) {
			if (targetNode.value < midNode.value) {
				if (midNode.left === null) midNode.left = targetNode;
				else insertLeafNode(midNode.left);
			} else if (targetNode.value > midNode.value) {
				if (midNode.right === null) midNode.right = targetNode;
				else insertLeafNode(midNode.right);
			} else console.log('Node already exists!');
		}
	}

	function remove(target) {
		if (target === rootNode.value) removeRootNode();
		else findTargetNode(rootNode);
		prettyPrint();

		function removeRootNode() {
			const nextBiggestNode = getNextBiggestNode(rootNode.right);
			const newNodeRightChild = nextBiggestNode.right;

			rootNode.value = nextBiggestNode.value;
			// Condition to determine the direct right child of root node.
			if (nextBiggestNode.value === rootNode.right.value) {
				rootNode.right = rootNode.right.right;
			} else {
				rootNode.right.left = newNodeRightChild;
			}

			function getNextBiggestNode(midNode) {
				if (!midNode.left) return midNode;

				return getNextBiggestNode(midNode.left);
			}
		}

		function findTargetNode(midNode) {
			// Base Conditions

			if (!midNode || (!midNode.left && !midNode.right)) {
				return console.log('Node not found!');
			}
			// When midNode is parent, and target node is on left.
			if (midNode.left && midNode.left.value === target) {
				return targetNodeHandler(midNode, midNode.left, true);
			}
			// When midNode is parent, and target node is on left.
			if (midNode.right && midNode.right.value === target) {
				return targetNodeHandler(midNode, midNode.right, false);
			}
			// Recurse
			if (target < midNode.value) findTargetNode(midNode.left);
			if (target > midNode.value) findTargetNode(midNode.right);
		}

		function targetNodeHandler(parentNode, targetNode, isTargetOnLeft) {
			// When targetNode has both child
			if (targetNode.left && targetNode.right) {
				removeTargetWhenBothChild(parentNode, targetNode, isTargetOnLeft);
			}
			// When targetNode has no child
			else if (!targetNode.left && !targetNode.right) {
				if (isTargetOnLeft) parentNode.left = null;
				else parentNode.right = null;
			} else if (targetNode.left) {
				removeTargetWhenSingleChild(parentNode, isTargetOnLeft, true);
			} else if (targetNode.right) {
				removeTargetWhenSingleChild(parentNode, isTargetOnLeft, false);
			}

			function removeTargetWhenSingleChild(parentNode, isTargetOnLeft, isChildOnLeft) {
				if (isTargetOnLeft && isChildOnLeft) parentNode.left = parentNode.left.left;
				else if (isTargetOnLeft && !isChildOnLeft) parentNode.left = parentNode.left.right;
				else if (!isTargetOnLeft && isChildOnLeft) parentNode.right = parentNode.right.left;
				else if (!isTargetOnLeft && !isChildOnLeft) {
					parentNode.right = parentNode.right.right;
				}
			}

			function removeTargetWhenBothChild(parentNode, targetNode, isTargetOnLeft) {
				const nextBiggestNode = getNextBiggestNode(targetNode.right);
				const newNodeRightChild = nextBiggestNode.right;

				if (isTargetOnLeft) parentNode.left = nextBiggestNode;
				else parentNode.right = nextBiggestNode;

				nextBiggestNode.left = targetNode.left;
				// Condition to determine the direct right child of new node.
				if (nextBiggestNode.value === targetNode.right.value) {
					nextBiggestNode.right = targetNode.right.right;
				} else {
					nextBiggestNode.right = targetNode.right;
					nextBiggestNode.right.left = newNodeRightChild;
				}

				function getNextBiggestNode(midNode) {
					if (!midNode.left) return midNode;

					return getNextBiggestNode(midNode.left);
				}
			}
		}
	}

	function levelOrder(callback) {
		const orderedArr = [];
		const queue = [rootNode];
		while (queue.length !== 0) {
			const currNode = queue.shift();
			if (callback) callback(currNode);
			orderedArr.push(currNode);
			if (currNode.left) queue.push(currNode.left);
			if (currNode.right) queue.push(currNode.right);
		}

		if (!callback) return orderedArr;
	}

	function levelOrderRecursion(callback) {
		const orderedArr = [];
		const queue = [rootNode];
		traverse(queue.shift());
		if (!callback) return orderedArr;

		function traverse(midNode) {
			if (!midNode) return;
			if (callback) callback(midNode);
			orderedArr.push(midNode);
			if (midNode.left) queue.push(midNode.left);
			if (midNode.right) queue.push(midNode.right);
			traverse(queue.shift());
		}
	}

	function mergesortArray(arr) {
		if (arr.length === 1) return arr;

		const leftArr = mergesortArray(arr.slice(0, Math.ceil(arr.length / 2)));
		const rightArr = mergesortArray(arr.slice(Math.ceil(arr.length / 2)));
		const sortedArr = [];

		while (leftArr.length && rightArr.length) {
			if (leftArr[0] === rightArr[0]) {
				// Condition to remove Duplicates by only pushing 1 occurance of the value.
				sortedArr.push(leftArr.shift());
				rightArr.shift();
			} else if (leftArr[0] < rightArr[0]) sortedArr.push(leftArr.shift());
			else sortedArr.push(rightArr.shift());
		}

		if (leftArr.length === 0) sortedArr.push(...rightArr);
		else sortedArr.push(...leftArr);

		return sortedArr;
	}

	function Node(value, left = null, right = null) {
		return {
			value,
			left,
			right,
		};
	}

	function buildTree(sortedArr, start, end) {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const midNode = Node(sortedArr[mid]);
		midNode.left = buildTree(sortedArr, start, mid - 1);
		midNode.right = buildTree(sortedArr, mid + 1, end);
		return midNode;
	}

	return {
		rootNode,
		prettyPrint,
		find,
		insert,
		remove,
		levelOrder,
		levelOrderRecursion,
	};
}
