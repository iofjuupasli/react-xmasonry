import React from "react";
import debounce from "../utils/debounce.jsx";

/**
 * @npm react-xmasonry
 */
export default class XMasonry extends React.Component {

    // static propTypes = { // React.propTypes are deprecated as of React v15.5
    //     center: React.PropTypes.bool,
    //     maxColumns: React.PropTypes.number,
    //     responsive: React.PropTypes.bool,
    //     targetBlockWidth: React.PropTypes.number,
    //     updateOnFontLoad: React.PropTypes.bool,
    //     updateOnImagesLoad: React.PropTypes.bool
    // };

    static defaultProps = {
        center: true,
        maxColumns: Infinity,
        responsive: true,
        targetBlockWidth: 300,
        updateOnFontLoad: true,
        updateOnImagesLoad: true
    };

    static containerStyle = {
        position: `relative`
    };

    getBestFitColumn (heights, width = 1) {
        const actualCols = Math.min(heights.length - width + 1, this.props.maxColumns - width + 1);
        let minIndex = 0,
            minHeight = Infinity;
        for (let i = 0; i < actualCols; ++i) {
            let currentMinHeight = Math.max.apply(null, heights.slice(i, i + width));
            if (currentMinHeight < minHeight) {
                minHeight = currentMinHeight;
                minIndex = i;
            }
        }
        return { col: minIndex, height: minHeight };
    }

    state = {
        blocks: {},
        containerHeight: 0,
        columns: 1,
        containerWidth: 0
    };

    // These properties are just a sync representation of state properties.
    columns = this.state.columns;
    blocks = this.state.blocks;

    /**
     * XMasonry layout container reference.
     * @type {HTMLElement}
     * @readonly
     */
    container = null;

    /**
     * Indicates if the component is mounted.
     * @type {boolean}
     * @private
     */
    mounted = false;

    /**
     * De-bouncing properties used to prevent size recalculations being called very often.
     * @type {function}
     * @private
     */
    debouncedResize = debounce(this.updateContainerWidth.bind(this));

    /**
     * This property assigns the fixed height to XMasonry container. The purpose of this is to
     * prevent masonry layout from updating infinitely. For example, when the elements get measured
     * and placed first time, the scroll bar may appear. Because of the width change XMasonry will
     * go to recalculate sizes once again, appearing at the initial state again because elements to
     * calculate got detached from the DOM. This creates an infinite loop. The solution for this is
     * to fix the container's previously calculated height until all the elements will be measured.
     * @type {number}
     * @private
     */
    fixedHeight = 0;

    /**
     * The width of XMasonry block in pixels. Is assigned dynamically, and must be in sync with the
     * state property.
     * @type {number}
     * @readonly
     */
    containerWidth = this.state.containerWidth;

    /**
     * Update XMasonry layout. It is safe to trigger this function multiple times, size updates are
     * optimized.
     */
    update = this.updateInternal.bind(this);

    constructor (props) {
        super(props);
        if (this.props.responsive)
            window.addEventListener("resize", this.debouncedResize);
        if (this.props.updateOnFontLoad && document.fonts && document.fonts.addEventListener)
            document.fonts.addEventListener("loadingdone", this.update);
        this.updateContainerWidth();
    }

    updateInternal () {
        if (!this.updateContainerWidth())
            this.measureChildren();
    }

    componentDidMount() {
        this.mounted = true;
        this.updateInternal();
    }

    componentWillUnmount () {
        this.mounted = false;
        window.removeEventListener("resize", this.debouncedResize);
        if (this.props.updateOnFontLoad && document.fonts && document.fonts.addEventListener)
            document.fonts.removeEventListener("loadingdone", this.update);
    }

    componentWillReceiveProps (newProps) {
        // Other conditions are already covered, except of removing children without adding new ones
        if (newProps.children.length < this.props.children.length) {
            let newKeys = new Set(),
                deleted = {};
            for (let i = 0; i < newProps.children.length; i++)
                newKeys.add(newProps.children[i].key);
            for (let i = 0; i < this.props.children.length; i++) {
                if (!newKeys.has(this.props.children[i].key))
                    deleted[this.props.children[i].key] = {};
            }
            this.recalculatePositions(null, deleted);
        }
    }

    componentDidUpdate() {
        this.updateInternal();
    }

    /**
     * Get number of columns by the given width in pixels.
     * @param {number} width
     * @returns {number}
     */
    getColumnsNumber (width) {
        return Math.max(1, Math.round(width / this.props.targetBlockWidth));
    }

    /**
     * @private
     * @returns {boolean} - Width updated.
     */
    updateContainerWidth () {
        if (!this.mounted) return false;
        let newWidth = this.container.clientWidth;
        if (newWidth === this.containerWidth)
            return false;
        this.setState({
            columns: this.columns = this.getColumnsNumber(newWidth),
            containerWidth: this.containerWidth = newWidth,
            blocks: this.blocks = {}
        });
        return true;
    }

    /**
     * Measure non-measured blocks and update measured.
     * @private
     */
    measureChildren () {
        let blocks = {},
            update = false;
        for (let i = 0; i < this.container.children.length; i++) {
            let child = this.container.children[i],
                hasXKey = child.hasAttribute("data-xkey"),
                key = child.getAttribute("data-key");
            if (!hasXKey && (this.blocks[key] || {}).height === child.clientHeight)
                continue;
            blocks[key] = {
                height: child.clientHeight
            };
            if (!update) update = true;
        }
        // console.log(`Measure children, update=${ update }`);
        if (update) this.recalculatePositions(blocks);
    }

    /**
     * @param {object} newBlocks
     * @param {object} deletedBlocks
     * @private
     */
    recalculatePositions (newBlocks = null, deletedBlocks = null) {
        let blocks,
            heights = Array.from({ length: this.columns }, () => 0);
        if (deletedBlocks) {
            blocks = {};
            for (let key in this.blocks)
                if (this.blocks.hasOwnProperty(key) && !deletedBlocks.hasOwnProperty(key))
                    blocks[key] = this.blocks[key];
            for (let key in newBlocks)
                if (newBlocks.hasOwnProperty(key) && !deletedBlocks.hasOwnProperty(key))
                    blocks[key] = newBlocks[key];
        } else {
            blocks = {
                ...this.blocks,
                ...newBlocks
            }
        }
        for (let i = 0; i < this.container.children.length; i++) {
            let child = this.container.children[i],
                key = child.getAttribute("data-key");
            if (!blocks.hasOwnProperty(key)) continue;
            if (deletedBlocks && deletedBlocks.hasOwnProperty(key)) continue;
            let blockWidth = +child.getAttribute("data-width") || 1,
                { col, height } = this.getBestFitColumn(heights, blockWidth),
                newHeight = height + blocks[key].height;
            blocks[key].left = this.containerWidth * col / this.columns;
            blocks[key].top = height;
            for (let i = 0; i < blockWidth; ++i) heights[col + i] = newHeight;
        }
        if (this.props.center && heights[heights.length - 1] === 0) {
            let emptyColumns = 1;
            for (; heights[heights.length - 1 - emptyColumns] === 0; ++emptyColumns);
            let leftMargin = this.containerWidth * emptyColumns / this.columns / 2;
            for (let key in blocks)
                if (blocks.hasOwnProperty(key)) blocks[key].left += leftMargin;
        }
        this.setState({
            blocks: this.blocks = blocks,
            containerHeight: Math.max.apply(null, heights)
        });
    }

    render () {
        let toMeasure = 0;
        const elements = this.containerWidth === 0 ? []
            : Array.prototype.slice.call(this.props.children).map((element) => {
                let measured = this.blocks[element.key], // || undefined
                    width = Math.min(element.props.width, this.columns);
                if (!measured) ++toMeasure;
                return measured
                    ? React.cloneElement(element, {
                        "data-key": element.key,
                        "style": {
                            width: Math.floor(width * this.containerWidth / this.columns),
                            // height: measured.height,
                            left: Math.floor(measured.left),
                            top: measured.top
                        },
                        "measured": true,
                        "width": width,
                        "height": measured.height,
                        "parent": this
                    })
                    : React.cloneElement(element, {
                        "data-key": element.key,
                        "data-xkey": element.key,
                        "style": {
                            width: Math.floor(width * this.containerWidth / this.columns),
                            visibility: "hidden"
                        },
                        "width": width,
                        "height": 0,
                        "parent": this
                    });
            });
        let actualHeight = elements.length - toMeasure > 0 || elements.length === 0
            ? this.fixedHeight = this.state.containerHeight
            : this.fixedHeight;
        // console.log(`Render: measured=${ elements.length - toMeasure }, not=${ toMeasure }`);
        const { center, maxColumns, responsive, targetBlockWidth, updateOnImagesLoad,
            updateOnFontLoad, className, style, ...restProps } = this.props;
        return <div className={className ? `xmasonry ${className}` : `xmasonry`}
                    style={ {
                        ...XMasonry.containerStyle,
                        height: actualHeight,
                        ...style
                    } }
                    ref={ (c) => this.container = c }
                    { ...restProps }>
            { elements }
        </div>;
    }

}