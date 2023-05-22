import Tree, { TreeNodeEventCallback } from 'react-d3-tree';

import { useLocationContext } from '../../contexts/location.context';

import './overview.css';
import { D3TreeNode } from './d3-tree';
import { SyntheticEvent } from 'react';

const Overview = ({ onNodeClick }: { onNodeClick: () => void }) => {
    const { convertNodeToTree, currentLocationId, setCurrentLocationId } =
        useLocationContext();
    const tree = convertNodeToTree(0);

    const _onNodeClick: TreeNodeEventCallback = (nodeData, event) => {
        console.log({ nodeData, event });
        const data = nodeData.data as unknown as D3TreeNode;
        setCurrentLocationId(data.attributes.id);
        onNodeClick();
    };

    return (
        <div className="overview">
            <Tree
                data={tree}
                collapsible={false}
                orientation="vertical"
                translate={{ x: 680, y: 50 }}
                zoomable
                initialDepth={90}
                onNodeClick={_onNodeClick}
            />
        </div>
    );
};

export default Overview;
