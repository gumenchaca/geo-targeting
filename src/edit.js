/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, CheckboxControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { continents } = attributes;
    const [selectedContinents, setSelectedContinents] = useState(continents || []);

    const availableContinents = [
        { label: 'Africa', value: 'Africa' },
        { label: 'America', value: 'America' },
        { label: 'Asia', value: 'Asia' },
        { label: 'Europe', value: 'Europe' },
        { label: 'Oceania', value: 'Oceania' },
    ];

    useEffect(() => {
        // Initialize selectedContinents with all available continents
        setSelectedContinents(availableContinents.map(continent => continent.value));
        // Set attributes with all available continents
        setAttributes({ continents: availableContinents.map(continent => continent.value) });
    }, []);

    const updateContinents = (continent, isChecked) => {
        const newContinents = isChecked
            ? [...selectedContinents, continent]
            : selectedContinents.filter((item) => item !== continent);
        setSelectedContinents(newContinents);
        setAttributes({ continents: newContinents });
    };


    const blockProps = useBlockProps({
        className: `continent-block ${selectedContinents.join(' ').replace(/\s+/g, '-').toLowerCase()}`,
        'data-continent': selectedContinents.join(' '),
    });   

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Continent Settings', 'continent-block')}>
                    {availableContinents.map((continent) => (
                        <CheckboxControl
                            key={continent.value}
                            label={continent.label}
                            checked={selectedContinents.includes(continent.value)}
                            onChange={(isChecked) => updateContinents(continent.value, isChecked)}
                        />
                    ))}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                {selectedContinents.length > 0 && (
                    <div className="continent-label">
                        {selectedContinents.join(', ')}
                    </div>
                )}
                <InnerBlocks />
            </div>
        </>
    );
}
