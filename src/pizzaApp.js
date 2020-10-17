import React from 'react';
import './index.css';

const validEmailRegex = 
  RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    //if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );

  return valid;
}

class PizzaApp extends React.Component {
    state = {
        size: 'medium',
        glutenFree: false,
        topping: '',
        instructions: '',
        pizzaName: null,
        email: null,
        password: null,
        errors: {
          pizzaName: '',
          email: '',
          password: '',
        }
    };
 
  setSize = event => {
    this.setState({
      size: event.target.value
    });
  };
 
  setGlutenFree = event => {
    this.setState({
      glutenFree: event.target.checked
    });
  };
 
  setInstructions = event => {
    this.setState({
      instructions: event.target.value
    });
  };
 
  setTopping = event => {
    this.setState({
      topping: event.target.value
    });
  };
 
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'pizzaName':
        errors.pizzaName = 
          value.length < 5 
            ? 'Pizza Name must be 5 characters long!'
            : '';
        break;
      case 'email' :
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid'
        break;
      case 'password':
        errors.password = 
          value.length < 8 
            ? 'Password must be 8 characters long!'
            : ''
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
    
  }

  handleSubmit = event => {
    event.preventDefault();
 
    const {
      size,
      glutenFree,
      topping,
      instructions, 
    } = this.state;
 
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
      alert(`Your order:
      Size: ${size}
      Gluten free? ${glutenFree ? 'yes' : 'no'}
      Topping: ${topping || 'none'}
      Special instructions: ${instructions || 'none'}`);
    } else {
      console.error('Invalid Form')
    }
  };
  render() {
    const {
      size,
      glutenFree,
      instructions,
      topping,
      errors
    } = this.state;
 
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Order Your Pizza</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="pizzaName">
              <label>Pizza Name</label>
              <input
                type="text"
                name="pizzaName"
                onChange={this.handleChange}
              />
              {errors.pizzaName.length > 0 && 
                <span className="error">{errors.pizzaName}</span>}
            </div>
            <div className="email">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <label>Size</label>
            <div className="size">
              <label>
                <input
                  type="radio"
                  value="small"
                  checked={size === 'small'}
                  onChange={this.setSize}
                />
                Small
              </label>
              <label>
                <input
                  type="radio"
                  value="medium"
                  checked={size === 'medium'}
                  onChange={this.setSize}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  value="large"
                  checked={size === 'large'}
                  onChange={this.setSize}
                />
                Large
              </label>
            </div>
           
            <br />
            <br />
            <div className="topping">
              <label>
                Topping
                <br />
                <select
                  onChange={this.setTopping}
                  value={topping}
                >
                  <option value="">
                    - Pick a topping -
                  </option>
                  <option value="pepperoni">
                    Pepperoni
                  </option>
                  <option value="peppers+onions">
                    Peppers and onions
                  </option>
                  <option value="pineapple">
                    Pineapple
                  </option>
                </select>
              </label>
            </div>
            <br />
            <br />
            <label>
              <input
                type="checkbox"
                checked={glutenFree}
                onChange={this.setGlutenFree}
              />
              Gluten free
            </label>
            <br />
            <br />
            <div className="instructions">
              <label>
                Special instructions:
                <br />
                <textarea
                  value={instructions}
                  onChange={this.setInstructions}
                />
              </label>
            </div>
            
            <br />
            <br />
            <div className="password">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Send Order</button>
          </form>
        </div>
      </div>
        
    );
  }
}


export default PizzaApp;