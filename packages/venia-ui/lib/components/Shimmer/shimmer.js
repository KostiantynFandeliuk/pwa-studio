import React, { useMemo } from 'react';
import {
    node,
    number,
    object,
    oneOf,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { useStyle } from '../../classify';
import defaultClasses from './shimmer.css';

const Shimmer = props => {
    const {
        classes: propClasses,
        borderRadius,
        height,
        width,
        style: customStyles,
        type,
        children,
        childrenTag: ChildrenTag,
        childrenStyles,
        ...restProps
    } = props;
    const classes = useStyle(defaultClasses, propClasses);

    const style = useMemo(() => {
        const combinedStyles = {
            ...customStyles
        };

        Object.entries({ borderRadius, height, width }).forEach(
            ([type, value]) => {
                if (typeof value !== 'undefined') {
                    combinedStyles[type] =
                        typeof value === 'number' ? `${value}rem` : value;
                }
            }
        );

        return combinedStyles;
    }, [customStyles, borderRadius, height, width]);

    const rootClass = `root_${type}`;

    return (
        <div className={classes[rootClass]} style={style} {...restProps}>
            <ChildrenTag className={classes.content} style={childrenStyles}>
                {children}
            </ChildrenTag>
        </div>
    );
};

/**
 * Props for {@link Shimmer}
 *
 * @typedef props
 *
 * @property {Object} classes is an object containing the class names for the
 * Shimmer component.
 * @property {string} classes.root is the class for the container
 * @property {string} classes.root_rectangle is the class for the container
 * of type rectangle
 * @property {string} classes.root_button is the class for the container
 * of type button
 * @property {string} classes.root_checkbox is the class for the container
 * of type checkbox
 * @property {string} classes.root_radio is the class for the container
 * of type radio
 * @property {string} classes.root_textArea is the class for the container
 * of type textArea
 * @property {string} classes.root_textInput is the class for the container
 * of type textInput
 * @property {string} classes.content is the class for the content
 * @property {number | string} borderRadius is the border radius of the Shimmer
 * @property {number | string} height is the height of the Shimmer
 * @property {number | string} width is the width of the Shimmer
 * @property {Object} style is an object of inline styles
 * @property {string} type is the type of the Shimmer
 * @property {node} children are the children of the Shimmer
 * @property {string} childrenTag is the html tag of the Shimmer content
 * @property {object} childrenStyles are the custom styles of the
 * Shimmer content
 */
Shimmer.propTypes = {
    classes: shape({
        root: string,
        root_rectangle: string,
        root_button: string,
        root_checkbox: string,
        root_radio: string,
        root_textArea: string,
        root_textInput: string,
        content: string
    }),
    borderRadius: oneOfType([number, string]),
    height: oneOfType([number, string]),
    width: oneOfType([number, string]),
    style: shape({}),
    type: oneOf([
        'rectangle',
        'button',
        'checkbox',
        'radio',
        'textArea',
        'textInput'
    ]),
    children: node,
    childrenTag: string,
    childrenStyles: object
};

Shimmer.defaultProps = {
    style: {},
    type: 'rectangle',
    childrenTag: 'span',
    childrenStyles: {}
};

export default Shimmer;
