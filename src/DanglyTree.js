// @ts-check

const Node = require('./utils/Node');

/**
 * A tree that can be modified to 'dangle' by any node
 * @class
 */
class DanglyTree {
    /**
     * Creates a dangly tree
     * @param {Node} rootNode - root of the tree
     */
    constructor(rootNode) {
        this.rootNode = rootNode;
    }

    /**
     * Dangles the tree by the node with name `nodeName`
     * @param {string} nodeName - name of node
     * @throws Will throw an error if no node exists with name `nodeName`
     */
    dangleBy(nodeName) {
        // first, find the node in the tree
        const node = this.findNode(nodeName);

        // If the node doesn't exist throw an error
        if (!node) {
            throw new Error(`Node with name "${nodeName} does not exist!"`);
        }

        // if the node is the current root node, we're done!
        if (node === this.rootNode) {
            return;
        }

        // dangle by the node
        this._dangleBy(node, null);
        // set the node we have dangled by to the new root node
        this.rootNode = node;
    }

    /**
     * Internal auxillary function to recursively determine new children of each node
     * Function is used to keep `dangleBy(nodeName)` signature clean
     * @param {Node} currentNode 
     * @param {Node | null} newParentNode 
     */
    _dangleBy(currentNode, newParentNode) {
        // the current node will keep all its previous children
        // unless a child has become its new parent
        const newChildren = [
            ...currentNode.children.filter(child => child !== newParentNode)
        ];

        // additionally, the current node's parent will become a child
        // unless its parent has remained its parent
        if (currentNode.parent && currentNode.parent !== newParentNode) {
            newChildren.push(currentNode.parent);

            // Since the current node's child subtrees have not changed,
            // we only need to update its former parent subtree 
            this._dangleBy(currentNode.parent, currentNode);
        }

        // finally, update the children and parent of the current node
        currentNode.children = newChildren;     
        currentNode.parent = newParentNode;
    }

    /**
     * Finds the node with the given name
     * @param {string} nodeName name of the node to find
     * @returns {Node | null} the node with specified name
     */
    findNode(nodeName) {
        // delegate work to auxillary function
        return this._findNode(nodeName, this.rootNode);
    }

    /**
     * Internal auxillary function to find node recursively
     * Function is used to keep `findNode(nodeName)` signature clean
     * @param {string} nodeName - name of node to find
     * @param {Node} currentNode - the current node being checked
     * @returns {Node | null} the node with name `nodeName`
     * @private
     */
    _findNode(nodeName, currentNode) {
        // Hooray, we found the node!
        if (currentNode.name === nodeName) {
            return currentNode;
        }

        // This isn't the node we're looking for so check the children
        let nodeFound = null;
        for (let childNode of currentNode.children) {
            nodeFound = this._findNode(nodeName, childNode);

            // if nodeFound is actually a node (not null), we have found
            // the node we were looking for so stop looking!
            if (nodeFound) {
                break;
            }
        }

        // At this point, either we have found the node or we return null
        return nodeFound;
    }

    get nodes() {
        return this._nodes(this.rootNode, []);
    }

    /**
     * Performs a depth first search and returns all nodes in an array
     * @param {Node} currentNode - node we are currently visiting
     * @param {Node[]} nodesArray - array of nodes traversed so far
     * @returns {Node[]} array of nodes in the tree
     */
    _nodes(currentNode, nodesArray) {
        nodesArray.push(currentNode);
        for (let childNode of currentNode.children) {
            this._nodes(childNode, nodesArray);
        }
        return nodesArray;
    }
}

module.exports = DanglyTree;
