import React from "react"
import Nav from './nav';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <section>
                    <Nav labels={this.props.labels}/>
                </section>
                <section>
                    {this.props.children}
                </section>
            </div>
        )
    }
}

export default Layout;
