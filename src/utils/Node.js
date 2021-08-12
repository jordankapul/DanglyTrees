// @ts-check

/**
 * Creates a tree node
 * @class
 */
class Node {
    /**
     * Create a node
     * @param {string} name - identifier for the node 
     * @param {(Node | null)} parent - parent node
     * @param {Node[]} [children=[]] - array of child nodes
     */
    constructor(name, parent, children=[]) {
        this.name = name;
        this._parent = parent;
        this._children = children;
    }

    get children() {
        return this._children;
    }

    set children(childNodes) {
        this._children = childNodes;
    }

    get parent() {
        return this._parent;
    }

    set parent(newParent) {
        this._parent = newParent;
    }

    isLeafNode() {
        return this.children.length === 0;
    }

    toString() {
        return `<Node -> name: ${this.name}, parent: ${this.parent?.name}, children: ${this.children.map(c => c.name)}>`;
    }
}

module.exports = Node;