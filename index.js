'use strict';

function buildTree(inputArr) {
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

	function Tree(sortedArr, start, end) {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const midNode = Node(sortedArr[mid]);
		midNode.left = Tree(sortedArr, start, mid - 1);
		midNode.right = Tree(sortedArr, mid + 1, end);
		return midNode;
	}

	const sortedArr = mergesortArray(inputArr);
	return Tree(sortedArr, 0, sortedArr.length - 1);
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
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
};
