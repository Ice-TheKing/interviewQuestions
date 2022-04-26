
/* QUESTION */
// Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting node.
// Note that the intersection is defined based on reference, not value.
// That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.

/* SOLUTION */
// by that definition, you should be able to find an intersection if two of the nodes in the trees are equal. If no nodes are equal, there would be no intersection

// brute force would be to loop through every node and check every node from the second linked list
// o(n*m) time, o(1) space
// you could also do it in o(n+m) time and o(n+m) space by using a set

function Node (num) {
    this.data = num;
    this.next = null;
}

const createLinkedList = (arr) => {
    let head = new Node(arr[0]);
    let n = head;

    for (let i = 1; i < arr.length; i++) {
        newNode = new Node(arr[i]);
        n.next = newNode;
        n = n.next;
    }

    return head;
}

const findIntersection = (h1, h2) => {
    let n1 = h1;
    let n2 = h2;

    // add all elements from h1 to a set
    let n1Set = fillNodeSet(n1);

    return containsIntersection(n1Set, h2);
    // check all elements in h2 against the set
    // return false if none are found
};

const fillNodeSet = (h) => {
    let newSet = new Set();

    while (h) {
        newSet.add(h);
        h = h.next;
    }

    return newSet;
};

const containsIntersection = (s, h) => {
    while(h) {
        if(s.has(h)) {
            return h;
        }
        h = h.next
    }

    return false;
};

let head1 = createLinkedList([5, 4, 6, 1, 8, 10]);
let head2 = createLinkedList([5, 4, 6, 1, 8, 10]); // no intersection with head 1
let head3 = createLinkedList([0]); // has intersection with head1

head3.next = head1.next.next.next;

console.dir(findIntersection(head1, head2)); // no intersection
console.dir(findIntersection(head1, head3)); // intersection
console.dir(findIntersection()); // edge case