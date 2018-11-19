import React, { Component } from 'react'

import { Block } from '../../common/block'
import EditableDropdown from './editable-dropdown'

class EditableDropdownExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Block>
                <EditableDropdown/>
            </Block>
        )
    }
}
export default EditableDropdownExample