/* REACT */
import React, { Component, Fragment } from 'react';

/* STYLES */
import "../../assets/css/style.css";

/* COMPONENTS */
import Input from "../../components/FormInput";
import Button from "../../components/FormButton";
import Table from "../../components/FormDataTable";

/**
 * This component class is being called on the ../../App.js
 * @author Alfie
 * Last Updated Date: July 29, 2022
 */
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            table_data: [
                { id: 1, designated_table: 0, first_name: "Alfie", last_name: "Osayan", email: "aosayan@village88.com"},
                { id: 2, designated_table: 0, first_name: "Ruel", last_name: "Ytac", email: "ruel.ytac@village88.com"},
                { id: 3, designated_table: 0, first_name: "Michael", last_name: "Choi", email: "mchoi@village88.com" },
                { id: 4, designated_table: 1, first_name: "Test1", last_name: "Test1", email: "aosayan@village88.com"},
                { id: 5, designated_table: 1, first_name: "Test2", last_name: "Test2", email: "ruel.ytac@village88.com"},
                { id: 6, designated_table: 1, first_name: "Test3", last_name: "Test3", email: "mchoi@village88.com"}
            ],
            is_input_valid: false,
            submit_label: "ADD",
            is_edit: false,
            id: 0,
            designated_table: 0
        }
    }

    /*
        * DOCU: This function will reset the form in default
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    handleResetForm = () => {
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
        });
        let form_inputs = document.getElementsByTagName("input");

        /* loop thru input field to remove css classes */
        for (let input of form_inputs) {
            input.classList.remove("input_valid");
            input.classList.remove("input_error");
        }
    };

    /*
        * DOCU: This function will submit the form data to the table
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    handleSubmitForm = (event) => {
        event.preventDefault();
        
        let form_elements = event.target.elements;
        let first_name = form_elements["first_name"].value;
        let last_name = form_elements["last_name"].value;
        let email = form_elements["email"].value;

        /* check if all the input fields are valid */
        if (this.state.is_input_valid) {
            /* if the form is in updating state, will update the table, else add data from the form */
            if (this.state.is_edit) {
                this.updateUserData(first_name, last_name, email)
            }
            else {
                this.addUserData(first_name, last_name, email); 
            }
        }
        else {
            window.alert("Invalid Input/s");
        }
        this.handleResetForm();
    }

    /*
        * DOCU: This function will handle changes in form inputs
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    handleInputChange = (event) => {
        event.preventDefault();

        let target = event.target;

        this.setState({
            [target.name]: target.value
        });

        this.validateSimpleFormInputs();
    }

    /*
        * DOCU: This function will move the data to upper or lower table
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    handleMoveDataToOtherTable = (id, designated_table) => {
        let table_data = this.state.table_data.map(row_data => {
            if (row_data.id === id) {
                /* if designated_table value is 0, changed it to 1 (vice versa) */
                return { ...row_data, designated_table: 1 - designated_table };
            }
            return row_data;
        })

        this.setState({ table_data });
    }

    /*
        * DOCU: This function will set the form in updating state
        * Last Updated Date: July 29, 2022
        * @function
        * @author Alfie Osayan
    */
    handleEditRowData = row_data => {
        let { id, designated_table, first_name, last_name, email } = row_data;

        this.setState({
            first_name,
            last_name,
            email,
            submit_label: "UPDATE",
            is_edit: true,
            id,
            designated_table
        });
    }

    /*
        * DOCU: This function will delete the specific row in the table
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    handleDeleteRowData = id => {
        /* if the user clicks the confirm button, will delete the data to the table */
        if (window.confirm("Are you sure you want to delete?")) {
            const table_data = this.state.table_data.filter(user => user.id !== id);
            this.setState({ table_data });
        }
    }

    render() {
        let { first_name, last_name, email, submit_label } = this.state;
        let columns = ["FIRST NAME", "LAST NAME", "EMAIL ADDRESS", "ACTION"];

        return (
            <Fragment>
                <div className="form">
                    <form id="simple_form" onSubmit={this.handleSubmitForm}>
                        <Input onChange={this.handleInputChange} type="text" name="first_name" id="first_name" placeholder="First name..." value={first_name} />
                        <Input onChange={this.handleInputChange} type="text" name="last_name" id="last_name" placeholder="Last name..." value={last_name} />
                        <Input onChange={this.handleInputChange} type="text" name="email" id="email" placeholder="Email Address ..." value={email} />
                        <Button onClick={this.handleResetForm} type="button" id="reset_form_btn" label="RESET"/>
                        <Button type="submit" id="add_form_btn" label={submit_label}/>
                    </form>
                </div>
                <div id="upper_table">
                    <Table columns={columns} table_data={this.state.table_data.filter(row_data => row_data.designated_table === 0)} onMove={this.handleMoveDataToOtherTable} onDelete={this.handleDeleteRowData} onEdit={this.handleEditRowData} />
                </div>
                <div id="lower_table">
                    <Table columns={columns} table_data={this.state.table_data.filter(row_data => row_data.designated_table === 1)} onMove={this.handleMoveDataToOtherTable} onDelete={this.handleDeleteRowData} onEdit={this.handleEditRowData} />
                </div>
            </Fragment>
        );
    }

    /*
        * DOCU: This function adds the user to the data table
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    addUserData = (first_name, last_name, email) => {
        let id = this.state.table_data.length + 1;
        let designated_table = 0; /* 0 for upper table, 1 for lower table */

        this.setState(prevState => ({
            table_data: [...prevState.table_data, {id, designated_table, first_name, last_name, email }]
        }));
    }

    /*
        * DOCU: This function updates the table data
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    updateUserData = (first_name, last_name, email) => {
        let { table_data, id } = this.state;

        /* Will loop to check if the user data is in the table data */
        let new_data = table_data.map(row_data => {
            /*  will update if user data id matches in the row data id */
            if (row_data.id === id) {
                return { ...row_data, first_name, last_name, email };
            }

            return row_data;
        });

        this.setState({ table_data: new_data });
    }

    /*
        * DOCU: This function validates user input
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    validateSimpleFormInputs() {
        let form_inputs = document.getElementsByTagName("input");
        let email = document.getElementById("email");
        let input_classes = [];

        /* loop to check each input field */
        for (let form_input of form_inputs) {
            /* check if form input has value and no whitespaces */
            form_input.value !== "" && this.hasNoWhiteSpace(form_input.value) ?
                this.addInputValidClass(form_input) :
                this.addInputErrorClass(form_input)
            
            input_classes.push(form_input.classList.value);
        }

        /* check if the email is valid then update the css input field */
        this.validateEmail(email.value) ? this.addInputValidClass(email) : this.addInputErrorClass(email);

        /* will return false if email is not valid and if there is an error in form inputs */
        let is_input_valid = !this.validateEmail(email.value) || input_classes.includes("input_error") ? false : true;

        this.setState({ is_input_valid });
    }

    /*
        * DOCU: This function will validate the email address of the user's input
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    /*
        * DOCU: This function checks if a string has white spaces
        * Last Updated Date: July 27, 2022
        * @function
        * @author Alfie Osayan
    */
    hasNoWhiteSpace(string) {
        return string.trim().length !== 0;
    }

    /*
        * DOCU: This function adds input_valid css class then remove input_error css class
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    addInputValidClass(form_input) {
        form_input.classList.add("input_valid");
        form_input.classList.remove("input_error");
    }

    /*
        * DOCU: This function adds input_error css class then remove input_valid css class
        * Last Updated Date: July 28, 2022
        * @function
        * @author Alfie Osayan
    */
    addInputErrorClass(form_input) {
        form_input.classList.add("input_error");
        form_input.classList.remove("input_valid");
    }
}
 
export default Main;
