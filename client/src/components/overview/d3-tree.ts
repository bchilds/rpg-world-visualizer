import { WorldLocation, Feature } from '../../types/location.types';

export type D3NodeAttributes = {
    id: number;
    description?: string;
    features: Feature['id'][];
};

export type D3TreeNode = {
    name: string;
    attributes: D3NodeAttributes;
    children: D3TreeNode[];
};

const convertToD3Tree = (
    rootNode: WorldLocation,
    findNodeById: (id: number) => WorldLocation
): D3TreeNode => {
    const { id, name, description, childLocations, features } = rootNode;
    const d3Node: D3TreeNode = {
        name,
        attributes: {
            id,
            description,
            features,
        },
        children: [],
    };

    if (childLocations && childLocations.length > 0) {
        d3Node.children = childLocations
            .map((childId) => {
                const childNode = findNodeById(childId);
                if (childNode) {
                    return convertToD3Tree(childNode, findNodeById);
                }
                return null;
            })
            .filter(Boolean) as D3TreeNode[]; // Filter out any null values, although this shouldn't happen
    }

    return d3Node;
};

export default convertToD3Tree;
