"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVLTree = void 0;
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
class AVLTree {
    constructor() {
        this.root = null;
    }
    getHeight(node) {
        return node != null ? node.height : 0;
    }
    updateHeight(node) {
        node.height =
            Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    getBalanceFactor(node) {
        return node != null
            ? this.getHeight(node.left) - this.getHeight(node.right)
            : 0;
    }
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }
    balance(node) {
        if (node == null)
            return null;
        this.updateHeight(node);
        const balance = this.getBalanceFactor(node);
        if (balance > 1) {
            if (this.getBalanceFactor(node.left) < 0) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.getBalanceFactor(node.right) > 0) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }
        return node;
    }
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
    insertNode(node, value) {
        if (node == null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        else {
            return node; // Duplicate values are not allowed
        }
        this.balance(node);
        return this.balance(node);
    }
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        else if (value < node.value) {
            return this.searchNode(node.left, value);
        }
        else {
            return this.searchNode(node.right, value);
        }
    }
    minValue() {
        if (this.root == null) {
            return null;
        }
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }
    deleteNode(node, value) {
        if (node == null)
            return node;
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        }
        else {
            if (node.left == null || node.right == null) {
                // node = node.left != null || node.right
                node = node.left != null ? node.left : node.right;
            }
            else {
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.deleteNode(node.right, minValue);
            }
        }
        return this.balance(node);
    }
    findMinValue(node) {
        if (node.left === null) {
            return node.value;
        }
        return this.findMinValue(node.left);
    }
}
exports.AVLTree = AVLTree;
