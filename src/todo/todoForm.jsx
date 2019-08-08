import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search, add, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, description } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search(description) : add(description)
        } else if (e.key === 'Escape') {
            this.props.clear()
        }
    }

    render() {
        const { add, search, description } = this.props
        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <input
                        id='description'
                        className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description}
                    ></input>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton
                        style='primary'
                        icon='plus'
                        onClick={() => add(description)}
                        title='Tecla Enter para adicionar'
                    />
                    <IconButton
                        style='info'
                        icon='search'
                        onClick={search}
                        title='Tecla Shift + Enter para pesquisar'
                    />
                    <IconButton
                        style='default'
                        icon='close'
                        onClick={this.props.clear}
                        title='Tecla Esc para apagar a pesquisa'
                    />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    description: state.todo.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeDescription, search, add, clear
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)