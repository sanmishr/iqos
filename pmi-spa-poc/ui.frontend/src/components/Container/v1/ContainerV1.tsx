/*
 *  Copyright 2020 Adobe
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, {RefObject} from "react";

import {
    AllowedComponentsContainer,
    ComponentMapping,
    Container,
    ResponsiveGrid,
    ResponsiveGridProperties
} from '@adobe/aem-react-editable-components';
import {CoreContainerProperties, CoreContainerState, withStandardBaseCssClass} from './AbstractCoreContainerComponent';

export interface ContainerV1Properties extends CoreContainerProperties, ResponsiveGridProperties {
    backgroundStyle: string;
    id: string;
    layout?: 'responsiveGrid' | 'simple';
    children: any;
    paddingLeft: string;
    paddingRight: string;
}

class ContainerV1Impl extends AllowedComponentsContainer<ContainerV1Properties, CoreContainerState> {

    mainDiv: RefObject<HTMLDivElement>;

    constructor(props: ContainerV1Properties) {
        super(props);

        //@ts-ignore
        this.state = {
            componentMapping: this.props.componentMapping || ComponentMapping,
        };
        this.mainDiv = React.createRef();
    }

    get coreContainerProps() {
        return {
            className: 'container responsivegrid'
        };
    }

    componentDidMount() {
        if (this.mainDiv.current) {
            this.mainDiv.current.setAttribute('style', this.props.backgroundStyle);
        }

    }

    componentDidUpdate() {
        if (this.mainDiv.current) {
            this.mainDiv.current.setAttribute('style', this.props.backgroundStyle);
        }
    }

    render() {
        const {
            componentMapping,
            allowedComponents,
            children,
            cqPath,
            cqItems,
            cqItemsOrder,
            isInEditor,
            ...otherProps
        } = this.props;

        if (isInEditor && allowedComponents && allowedComponents.applicable) {
            return super.render();
        }

        const gridProps: ResponsiveGridProperties = {
            allowedComponents: {applicable: false, components: []},
            componentMapping: this.state.componentMapping,
            gridClassNames: this.props.gridClassNames,
            columnClassNames: this.props.columnClassNames,
            cqItems: this.props.cqItems,
            cqItemsOrder: this.props.cqItemsOrder,
            title: "",
            cqPath: this.props.cqPath,
            isInEditor: false
        };

        return (
            <div {...this.coreContainerProps}>
                <div ref={this.mainDiv}
                     id={this.props.id}
                     className={`${this.props.baseCssClass} ${this.props.paddingLeft} ${this.props.paddingRight}`}>

                    {(this.props.layout && this.props.layout === 'simple') &&
                        <Container
                            componentMapping={this.state.componentMapping}
                            cqForceReload={this.props.cqForceReload}
                            cqPath={this.props.cqPath}
                            cqItems={this.props.cqItems}
                            cqItemsOrder={this.props.cqItemsOrder}
                            isInEditor={false}/>}

                    {(!this.props.layout || this.props.layout !== 'simple') &&
                        <ResponsiveGrid {...gridProps}/>

                    }
                    {this.placeholderComponent}
                </div>
            </div>
        )
    }

}

export default withStandardBaseCssClass(ContainerV1Impl, "cmp-container");
