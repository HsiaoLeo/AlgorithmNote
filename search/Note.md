- # B-tree
1. **Definition**
    - a M-way Search Tree.
    - All Leaf Nodes must have the same Depth.
    - Three kind of node: Root node,Non-Leaf node and Leaf node
        1. Root node: 

            can be the Leaf node or Non-Leaf node,the number of key values in the node cannot be less than $1$
        1. Non-Leaf node:

            As with M-way tree,node can have up to $M-1$ key values and $M$ sub-nodes., but the number of key values cannot be less than $\lceil M/2 \rceil -1$ and the number of sub-nodes cannot be less than $\lceil M/2 \rceil$.
        1. Leaf node:

            The number of key values are $M-1 \ldots \lceil M/2 \rceil -1$ and no sub-nodes.
1. **Important Operation**
    - Insertion Step:
        1. Search for the Leaf node that needs to be inserted
        1. Inserts a new value into the Leaf node's set of key values and ensures that the set is in order.
            - if the number of key values not over the limit: Insert completion
            - if the number of key values over the limit:
                1. split the node by $\lceil M/2 \rceil$ th key values to node L with $1 \ldots \lceil M/2 \rceil -1$ th key values and node R with $\lceil M/2 \rceil +1 \ldots M-1$ th key values.
                1. Insert $\lceil M/2 \rceil$ th key values to parent Non-Leaf node's set of key values,ensures that the set is in order too.
        1. Do the check of the number of key values in parent Non-Leaf node too.
    - Deletion Step:
        1. Search for the key value that needs to be deleted.
            - if not found in tree, return failed.
        1. Found the target key value in Non-Leaf node.
            1. Search either the largest key value in LST or the smallest key value in RST,call tmp value.
            1. Replace the target key values with value tmp
            1. execute deletion with tmp value in LST or RST.
        1. Found the target key value in Leaf node and delete target key value.
            - if 
