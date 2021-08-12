// @ts-check

const DanglyTree = require('./DanglyTree');
const Node = require('./utils/Node');

// create example tree
const n1 = new Node('1', null);
const n2 = new Node('2', n1);
const n3 = new Node('3', n1);
const n4 = new Node('4', n2);
const n5 = new Node('5', n2);
const n6 = new Node('6', n3);
const n7 = new Node('7', n3);
const n8 = new Node('8', n4);
const n9 = new Node('9', n4);
const n10 = new Node('10', n5);
const n11 = new Node('11', n5);
const n13 = new Node('13', n6);
const n14 = new Node('14', n7);

n1.children = [n2, n3];
n2.children = [n4, n5];
n3.children = [n6, n7];
n4.children = [n8, n9];
n5.children = [n10, n11];
n6.children = [n13];
n7.children = [n14];

const danglyTree = new DanglyTree(n1);

// danglyTree.dangleBy('5');
// danglyTree.dangleBy('1');
danglyTree.dangleBy('13');

for (let node of danglyTree.nodes) {
    console.log(String(node), '\n');
}