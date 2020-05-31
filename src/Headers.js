import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PageHeaderWithAdd extends Component {
    render() {
        return (
            <PageHeader>
                <AddButton/>
            </PageHeader>
        );
    }
}

class PageHeader extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="d-flex w-100">
                        <h2 className="page-title">{this.props.title}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

class AddButton extends Component {
    render() {
        return (
            <div className="button-add">
                <Button variant="light" id="add-new-list" className="add-new btn btn-light btn-lg">+</Button>
            </div>
        )
    }
}

export default PageHeaderWithAdd;