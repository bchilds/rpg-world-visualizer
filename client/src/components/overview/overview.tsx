import Tree, { TreeNodeEventCallback } from 'react-d3-tree';

import { useLocationContext } from '../../contexts/location.context';

import './overview.css';
import { D3TreeNode } from './d3-tree';
import { useState } from 'react';
import { OverviewToolMode } from '../../types/overvew.types';
import OverviewTools from './overview-tools';
import { WorldLocation } from '../../types/location.types';

const Overview = ({ onNodeSelect }: { onNodeSelect: () => void }) => {
    const {
        convertNodeToTree,
        setCurrentLocationId,
        getLocationById,
        allLocations,
        updateLocation,
    } = useLocationContext();
    const tree = convertNodeToTree(0);
    const [overviewRef, setOverviewRef] = useState<HTMLDivElement | null>(null);
    const [overviewToolMode, setOverviewToolMode] =
        useState<OverviewToolMode>('select');

    const [reassignChild, setReassignChild] = useState<
        WorldLocation['id'] | null
    >(null);

    const overviewDimensions = overviewRef?.getBoundingClientRect();
    const translate = {
        x: overviewDimensions?.width ? overviewDimensions.width / 2 : 0,
        y: overviewDimensions?.height ? overviewDimensions.height / 6 : 0,
    };

    const _onNodeSelect: TreeNodeEventCallback = (nodeData, event) => {
        const data = nodeData.data as unknown as D3TreeNode;
        setCurrentLocationId(data.attributes.id);
        onNodeSelect();
    };

    const _onNodeReassign: TreeNodeEventCallback = (nodeData, event) => {
        // note that this function only works the way it does right now because there's one parent node for a child
        // this would need to be entirely re-evaluated if this system became a true graph
        const data = nodeData.data as unknown as D3TreeNode;

        // if there's no reassignChild selected, select that
        if (!reassignChild) {
            if (data.attributes.id !== 0) {
                // can't move root node yet
                setReassignChild(data.attributes.id);
            }
            return;
        }

        // if target is the same as reassigned child, unselect
        if (reassignChild === data.attributes.id) {
            setReassignChild(null);
            return;
        }

        // nodeData is the new parent
        // assign the child id to the parent list of children
        // remove the child from the old parent list of children
        const newParent = getLocationById(data.attributes.id);
        const oldParent = allLocations.find((l) =>
            l.childLocations.includes(reassignChild)
        );
        if (!oldParent) {
            throw new Error('oldParent not found');
        }

        const updatedNewParent = {
            ...newParent,
            childLocations: [...newParent.childLocations, reassignChild],
        };
        const updatedOldParent = {
            ...oldParent,
            childLocations: oldParent.childLocations.filter(
                (c) => c !== reassignChild
            ),
        };

        setReassignChild(null);
        updateLocation(updatedNewParent);
        updateLocation(updatedOldParent);
    };

    const _onNodeClick: TreeNodeEventCallback = (nodeData, event) => {
        if (overviewToolMode === 'select') {
            setReassignChild(null);
            return _onNodeSelect(nodeData, event);
        }
        if (overviewToolMode === 'reassign') {
            return _onNodeReassign(nodeData, event);
        }
    };

    return (
        <div className="overview" ref={setOverviewRef}>
            {overviewRef && (
                <>
                    <span>
                        {reassignChild && <div>Moving ID: {reassignChild}</div>}
                        <OverviewTools
                            currentMode={overviewToolMode}
                            onClick={setOverviewToolMode}
                        />
                    </span>
                    <Tree
                        data={tree}
                        collapsible={false}
                        orientation="vertical"
                        translate={translate}
                        zoomable
                        initialDepth={90}
                        onNodeClick={_onNodeClick}
                    />
                </>
            )}
        </div>
    );
};

export default Overview;
