import React, {Component} from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class CategoriesRecord extends Component{
    render(){
        return(
            <tr>
              <td>{this.props.element.id}</td>
              <td>{this.props.element.categoryName}</td>

              <td>
{this.props.element.categoryStatus === "ACTIVE" ? (
                    <b className="text-success">{this.props.element.categoryStatus}</b>
                  ) : (
                    <b className="text-danger">{this.props.element.categoryStatus}</b>
                  )}
</td>

              <td>
              <ButtonGroup>
                    <Button size="sm" variant="primary" onClick={() => this.props.handleEdit(this.props.element.id)}>Edit</Button>
                    {this.props.element.categoryStatus === 'DELETED' ?
                    <Button size="sm" variant="warning" onClick={() => this.props.handleReactivate(this.props.element.id)}>Reactivate</Button> :
                    
                    <Button size="sm" variant="warning" onClick={() => this.props.handleDelete(this.props.element.id)}>Delete</Button>
        }
                </ButtonGroup>
              </td>
            </tr>
        )
    }
}

export default CategoriesRecord;