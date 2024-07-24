import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    // Ensure continents is always an array
    const { continents = [] } = attributes;
    
    // Handle the case where continents might be undefined or not an array
    const continentClass = Array.isArray(continents) ? continents.join(' ') : '';
    const dataContinent = Array.isArray(continents) ? continents.join(' ') : '';

    const blockProps = useBlockProps.save({
        className: `continent-block ${continentClass}`,
        'data-continent': dataContinent,
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
};


export default save;
