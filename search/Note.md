- # B-tree
1. **Definition**
    - a M-way Search Tree.
    - Three kind of node: Root node,Non-Leaf node and Leaf node
        1. Root node: 

            A kind of Non-Leaf node,but the number of key values in the node cannot be less than 1
        1. Non-Leaf node:

            As with M-way tree,node can have up to $$M-1$$ key values and $$M$$ child nodes, but the number of key values cannot be less than $$\lceil M/2 \rceil -1$$ and the number of sub-nodes cannot be less than $$\lceil M/2 \rceil$$.
        1. Leaf node:

            The number of key values are between $$M-1$$ and $$\lceil M/2 \rceil -1$$ and no sub-nodes.
1. **Important Operation**
    - Insert Step:
        1. Search for the Leaf node that needs to be inserted
        1. Inserts a new value into the Leaf node's set of key values and ensures that the set is in order.
            - if the number of key values not over the limit: Insert completion
            - if the number of key values over the limit:
                1. split the node by $$\lceil M/2 \rceil$$ th key values to node L with $$1 \ldots \lceil M/2 \rceil -1$$ th key values and node R with $$\lceil M/2 \rceil +1 \ldots M-1$$ th key values.
                1. Insert $$\lceil M/2 \rceil$$ th key values to parent Non-Leaf node.