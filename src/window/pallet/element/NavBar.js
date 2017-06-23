import React from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { ipcRenderer } from 'electron'


export class Element extends React.Component {

  constructor(props) {
		super(props)

    let parameter = {}
    if( this.props.element && this.props.element.parameter )
      parameter = this.props.element.parameter

    this.state = {
      style: parameter.style,
      headers: parameter.headers,
      inverse: parameter.inverse,
      header: parameter.header,
      fixedTop: parameter.fixedTop,
      fixedBottom: parameter.fixedBottom,
      fluid: parameter.fluid,
      navigation: parameter.navigation
    }
	}

  onElementChanged = (event, element) => {
    // do only when it's same id
    if( this.props.element && this.props.element.id == element.id ) {
      let parameter = {}
      if( element && element.parameter )
        parameter = element.parameter

      this.setState({
        style: parameter.style,
        headers: parameter.headers,
        inverse: parameter.inverse,
        header: parameter.header,
        fixedTop: parameter.fixedTop,
        fixedBottom: parameter.fixedBottom,
        fluid: parameter.fluid,
        navigation: parameter.navigation
      })
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('element.changed', this.onElementChanged)
  }
  componentDidMount() {
      ipcRenderer.on('element.changed', this.onElementChanged)
  }

  click = (e) => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  clickNavItem = (e) => {
    ipcRenderer.send("currPage.changed", e.target.id)
  }


  render() {
    try {
      let navs = []
      if( this.state.navigation) {
        let sorted = []
        for ( let key in this.state.navigation ) sorted.push(key)
        sorted.sort()

        sorted.forEach( (key) => {
          let nav = this.state.navigation[key]
          navs.push(<NavItem key={key} id={nav.page} onClick={this.clickNavItem} >{nav.name}</NavItem>)
        })
      }

      return (
        <Navbar inverse={this.state.inverse}
          fixedBottom={this.state.fixedBottom}
          fixedTop={this.state.fixedTop}
          fluid={this.state.fluid}
          onClick={this.click}>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={this.clickNavItem} href="#">{this.state.header}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {navs}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
