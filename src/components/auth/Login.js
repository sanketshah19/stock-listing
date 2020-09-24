import React from 'react';
import swal from 'sweetalert';
import {Form, Button} from 'react-bootstrap';

import axios from '../../config/axios';

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        }
    }

    componentDidMount(){
        // display stocks page if authToken is already available
        if(localStorage.getItem('authToken')){
            this.props.history.push('/stocks')
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        let errors = this.state.errors
        const validEmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        switch (name) {
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'password': 
            errors.password = 
              value.length < 4
                ? 'Password must be 4 characters long!'
                : '';
            break;
          default:
            break;
        }
        this.setState({errors, [name]: value})
    }

    validateForm = (errors) => {
        let valid = true
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        )
        return valid
      }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.validateForm(this.state.errors)){
            const formData = {
              email: this.state.email,
              password: this.state.password
            }

            axios.get('/users.json')
                .then((response)=>{
                    const users = response.data
                    const user = users.find(user => user.email === formData.email)
                    if(user){
                        if(user.password === formData.password){
                            swal("Success!", "Login Successfully!" ,"success")
                            localStorage.setItem('authToken', user.token)
                            this.props.history.push('/stocks')
                            window.location.reload()
                        }else{
                            swal ("Oops", "Incorrect Password" ,"error")
                        }
                    }else{
                        swal ("Oops", "User is not registerd" ,"error")
                    }
                })
                .catch((err)=>{
                    swal ("Oops", `${err}` ,"error") 
                })

        }else{
            swal ("Oops","Please fill all the details correctly!","error")
        }
    }


    render(){
        const {errors} = this.state;
        return(
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="text-center">Sign In</h2><hr/>
                    <Form onSubmit={this.handleSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} name="email" required/>
                                <Form.Text className="text-muted">
                                {errors.email.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.email}</span>}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} name="password" required/>
                                <Form.Text className="text-muted">
                                {errors.password.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.password}</span>}
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg" className="col-md-6 offset-md-3" value="Submit">
                                Login
                            </Button>
                        </Form>
                </div>
            </div>
        )
    }

}

export default Login;