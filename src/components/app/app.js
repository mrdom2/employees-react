import { Component } from "react";
import _ from "lodash";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filer";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { name: "Jack Shapard", salary: 800, increase: false, id: _.uniqueId() },
                { name: "John Lock", salary: 400, increase: true, id: _.uniqueId() },
                { name: "Daniel Faraday", salary: 500, increase: false, id: _.uniqueId() }
            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: _.uniqueId()
        };

        this.setState(({ data }) => {
            const newData = [...data, newItem];
            return {
                data: newData
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppInfo />

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployeesList
                    onDelete={this.deleteItem}
                    data={this.state.data} />
                <EmployeesAddForm
                    onSubmitForm={this.addItem} />
            </div>
        );
    }
}

export default App;