/* QUESTION */
/* Consider a simple data structure called BiNode, which has pointers to two other nodes.
public class BiNode {
    public BiNode node1, node2;
    public int data;
}
The data structure BiNode could be used to represent both a binary tree (where node1 is the left node, and node2 is the right node) or a doubly linked list (where node1 is the previous node and node2 is the next node).
Implement a method to convert a binary search tree (implemented with BiNode) into a doubly linked list. The values should be kept in order and the operation should be performed in place (that is, on the original data structure).
*/

/** EXAMPLE *//*
        5
    2       7
  1   3   6

becomes

1 - 2 - 3 - 5 - 6 - 7
*/

/* SOLUTION */
// Noticing that an in-order traversal will give us our desired order
// let's first try to solve it with another data structure
// using an array we can return an in-order traversal of objects in an array, then go through that array and link them as a doubly linked list

const biNodeNotInPlace = (head) => {
    let inOrderList = inOrderTraverse(head);
    return linkArray(inOrderList);
};

const inOrderTraverse = (head, inOrderList = []) => {
    if (!head) {
        return;
    }

    inOrderTraverse(head.left, inOrderList);
    inOrderList.push(head);
    inOrderTraverse(head.right, inOrderList);

    return inOrderList;
};

const linkArray = (inOrderList, index = 0) => {
    if (index === inOrderList.length) {
        return null;
    }

    let thisNode = new BiNode();
    thisNode.data = inOrderList[index];

    thisNode.next = linkArray(inOrderList, index+1);

    return thisNode;
};

// this is great, but it's not what the problem asked. We have to do it in place...

// 1, 2, 3, 5, 6, 7

/* THINKING SPACE
        5
    2       7
  1   3   6

  once we get to 5, we should already have a list [1,2,3] that we can link to 5's node1, then calculate the rightside [6,7] and link it to 5's node2



    2
 1     3

 1 - 2 - 3
*/


const biNode = (head) => {
    let linkedList = buildLinkedList(head);
    return rewindNode(linkedList);
};


const buildLinkedList = (head) => {
    if (!head) {
        return null;
    }

    let left = traverse(head.node1);

    if (left) {
        // fast forward to right-most node
        left = fastForwardNode(left);

        // that becomes our leftmost child
        head.node1 = left;

        // leftmost child's next node becomes us
        left.node2 = head;
    }
    
    let right = traverse(head.node2);

    if (right) {
        // rewind node to left-most node
        right = rewindNode(right);

        // that node our right child
        head.node2 = right;

        // we become right node's left child
        right.node1 = head;
    }

    return head;
};

const fastForwardNode = (node) => {
    while (node.node2) {
        node = node2;
    }

    return node;
};

const rewindNode = (node) => {
    while (node.node1) {
        node = node1;
    }

    return node;
};

/* TEST
        5
    2       7
  1   3   6

  expected: 1 - 2 - 3 - 5 - 6 - 7

  node 5
  left = 3
  right = 6
  return 5

  driver function rewinds and returns node 1

  null - 1 - 2 - 3 - 5 - 6 - 7 - null | success!
*/

// time complexity: o(n^2) because we rewind/fast forward up to n times at each node, and there are n nodes
// space complexity: o(log n) Because of the recursive stack calls. Since we are given a binary search tree, it is going to be a balanced tree, meaning the depth is going to be log n where n is the number of elements
// we can also say the space complexity is o(d) where d is the depth of the tree.


// can we optimize further?
// I think we can. We could return leftmost node and rightmost node at each step, then for the parent recursive call, update leftmost or rightmost node depending on which side it's coming from
// this would become o(n) time because we don't have to keep fast forwarding and rewinding along the doubly linked list

const biNodeOptimized = (head) => {
    if (!head) return null; // will break if we get a null head, because null cannot read property: leftMostNode so check for it here
    return buildLinkedListOptimized(head).leftMostNode;
};

const buildLinkedListOptimized = (head) => {
    if (!head) {
        return null;
    }

    // by default, if there is no left or right node, leftMost and rightMost node will be this node
    let leftMostNode = head;
    let rightMostNode = head;

    let left = traverse(head.node1);

    if (left) {
        // our previous node is leftNode's rightmost node
        head.node1 = left.rightMostNode;

        // leftMost child's rightMost node's next node becomes us
        left.rightMostNode.node2 = head;

        // our leftMost node becomes leftMostNode's leftMostNode
        leftMostNode = left.leftMostNode;
    }
    
    let right = traverse(head.node2);

    if (right) {
        // our next node is rightNode's leftmost node
        head.node1 = left.rightMostNode;

        // rightMost child's leftMost node's previous node becomes us
        right.leftMostNode.node1 = head;

        // our rightMost node becomes rightMostNode's rightMostNode
        rightMostNode = right.rightMostNode;
    }

    return { leftMostNode: leftMostNode, rightMostNode: rightMostNode };
};

// time complexity: o(n)
// space complexity: o(log n) because there are log n calls in a balanced tree, and we are creating one object per recursive call


// completed in 45-50 minutes