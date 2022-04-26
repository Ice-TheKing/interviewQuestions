
/* QUESTION */
// Given a linked list which might contain a loop, impliment an algorithm that returns the node at the beginning of the loop (if one exists)

/* SOLUTION */
// Similar to the last question, we can use a set. For each node, check if it already exists in the set. If it does, return that node. If not, add that node to the set and check the next node
// o(n) time, o(n) space

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

const detectLoop = (h) => {
    let n = h;

    if(!n.next) {
        return false;
    }

    // add all elements from h1 to a set
    let nodeSet = new Set;
    nodeSet.add(n);
    n = n.next

    while(n.next) {
        if(nodeSet.has(n.next)) {
            return n;
        }
        nodeSet.add(n.next);
        n = n.next;
    }

    // no repeat nodes found
    return false;
};

let head1 = createLinkedList([5, 4, 6, 1, 8, 10]);
let head2 = createLinkedList([5, 4, 6, 1, 8, 10]);
head2.next.next.next.next.next = head2.next.next;

console.dir(detectLoop(head1));
console.dir(detectLoop(head2));

/* Can I solve it with o(n) time and o(1) space? */