import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiEdit2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import {
    Editor, EditorState, RichUtils,
    ContentState,
    CompositeDecorator,
    getDefaultKeyBinding, KeyBindingUtil
} from 'draft-js'
import 'draft-js/dist/Draft.css'

import { Block } from '../../common/block'

class EditableDropdown extends Component {
    static propTypes = {
        data: PropTypes.array,
        columnInfo: PropTypes.shape({
            valueColumn: PropTypes.any.isRequired,
            displayColumn: PropTypes.string.isRequired,
            gridColumn: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.any.isRequired,
                name: PropTypes.string.isRequired,
                width: PropTypes.number
            }))
        }),
        multiSelect: PropTypes.bool,
        allowEdit: PropTypes.bool,
    }
    static defaultProps = {
        data: [
            { col1: 1, col2: 'One', col3: 'Value1' },
            { col1: 2, col2: 'Two', col3: 'Value2' },
            { col1: 3, col2: 'Three', col3: 'Value3' },
            { col1: 4, col2: 'Four', col3: 'Value4' },
            { col1: 5, col2: 'Five', col3: 'Value5' },
        ],
        columnInfo: {
            valueColumn: 'col1',
            displayColumn: 'col2',
        },
        multiSelect: false,
        allowEdit: false
    }
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            rect: {},
            editorHeight: 35,
            showItems: false,
            search: '',
        }
        this.hasCommandModifier = KeyBindingUtil.hasCommandModifier
    }
    componentDidMount() {
        this.setState({ rect: this.container.getBoundingClientRect() })
        document.addEventListener('mousedown', this.handleClickOutside.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this))
    }
    handleClickOutside(evt) {
        if (this.container && !this.container.contains(evt.target)) {
            this.state.showItems && this.setState({ showItems: false })
        }
    }
    handleKeyCommand(command, editorState) {
        if (command === 'select-first') {
            console.log(command)
            const cc = editorState.getCurrentContent()
            if(cc.hasText()) {
                console.log(cc.getFirstBlock().getText())
            }
            return 'handled'
        }
        return 'not-handled'
        //const newState = RichUtils.handleKeyCommand(editorState, command)
        //if (newState) {
        //    this.onChange(newState)
        //    return 'handled'
        //}
        //return 'not-handled'
    }
    handleOnChange(editorState) {
        const cc = editorState.getCurrentContent()
        const lines = (cc.getBlockMap().size * 21) + 14
        const currentEditorHeight = this.editorContainer.getBoundingClientRect().height
        const editorHeight = currentEditorHeight > lines ? currentEditorHeight + 14 : lines
        this.setState({ editorState, editorHeight, showItems: true }, () => {
            this.setState({ rect: this.container.getBoundingClientRect() })
        })
        cc.hasText() && this.setState({search: cc.getPlainText().trim()})
    }
    handleDropClick() {
        this.setState({ showItems: !this.state.showItems })
    }
    handleClearClick() {
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''))
        this.setState({ editorState, editorHeight: 35 }, () => {
            this.setState({ rect: this.container.getBoundingClientRect() })
        })
    }
    handleEditClick() {
        console.log('edit')
    }
    myKeyBindingFn(e) {
        if (e.keyCode === 13) {
            return 'select-first'
        }
        return getDefaultKeyBinding(e)
    }
    findFirstItem(keyword) {
        return this.props.data.find()
    }
    render() {
        const { rect } = this.state
        const { data, columnInfo } = this.props
        return (
            <Container justifyEnd alignItemsCenter
                ref={c => this.container = c}
                editorHeight={this.state.editorHeight}
                showItems={this.state.showItems}
            >
                <EditorContainer ref={c => this.editorContainer = c}>
                    <Editor placeholder='Select'
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        onChange={this.handleOnChange.bind(this)}
                        keyBindingFn={this.myKeyBindingFn.bind(this)}
                    />
                </EditorContainer>
                <Clear justifyCenter alignSelfStretch onClick={this.handleClearClick.bind(this)}>
                    <FiX />
                </Clear>
                {this.props.allowEdit &&
                    <Edit justifyCenter alignSelfStretch onClick={this.handleEditClick.bind(this)}>
                        <FiEdit2 />
                    </Edit>
                }
                <Drop justifyCenter alignSelfStretch onClick={this.handleDropClick.bind(this)}>
                    {this.state.showItems ? <FiChevronUp /> : <FiChevronDown />}
                </Drop>
                {this.state.showItems &&
                    <ItemContainer rect={rect}>
                        {data.map((v, i) => {
                            return (
                                <Item key={i}>{v[columnInfo.displayColumn]}</Item>
                            )
                        })}
                    </ItemContainer>
                }
            </Container>
        )
    }
}
export default EditableDropdown

const Container = styled(Block)`
flex: 0 0 300px;
border: 1px solid black;
border-radius: 3px;
${p => p.showItems && `
border-radius: 3px 3px 0 0;
border-bottom: 1px solid transparent;
box-shadow:  0 10px 20px rgba(15,15,15,0.10), 0 6px 6px rgba(15,15,15,0.23);
`}
height: ${p => p.editorHeight + 'px'};
padding: 0 5px;
`
const EditorContainer = styled.div`
display: block;
width: 100%;
`
const ItemContainer = styled.div`
display: block;
position: fixed;
top: ${p => (p.rect.height + 9) + 'px'};
left: ${p => p.rect.left + 'px'};
width: ${p => p.rect.width + 'px'};
min-height: 100px;
max-height: 200px;
background-color: white;
color: black;
box-sizing: border-box;
border: 1px solid rgba(15,15,15,0.9);
border-radius: 0 0 3px 3px;
box-shadow:  0 10px 20px rgba(15,15,15,0.19), 0 6px 6px rgba(15,15,15,0.23);
padding: 8px 0;
z-index: 1;
`
const Item = styled(Block)`
padding: 4px 10px;
&:hover {
    background-color: rgba(15, 15, 15, 0.9);
    color: white;
    cursor: default;
}
`
const Button = styled(Block)`
flex: 0 0 auto;
width: 25px;
color: black;
&:hover {
    cursor: pointer;
}
`
const Clear = styled(Button)`
&:hover {
    color: red;
}
`
const Drop = styled(Button)`
&:hover {
    color: red;
}
`
const Edit = styled(Button)`
&:hover {
    color: red;
}
`