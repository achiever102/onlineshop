import React, {Component} from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class CategoriesRecord extends Component{
    render(){
        return(
            <tr>
              <td>{this.props.element.id}</td>
              <td>{this.props.element.categoryName}</td>
              <td>
              <ButtonGroup>
                    <Button size="sm" variant="primary" onClick={() => this.props.handleEdit(this.props.element.id)}>Edit</Button>
                    <Button size="sm" variant="warning" onClick={() => this.props.handleDelete(this.props.element.id)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
        )
    }
}

export default CategoriesRecord;